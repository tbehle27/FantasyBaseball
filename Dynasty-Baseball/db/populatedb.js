#! /usr/bin/env node
const { Client } = require("pg");

const SQL = `
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

DROP TABLE IF EXISTS manager;
CREATE TABLE manager (
  manager_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstName VARCHAR ( 30 ),
  lastName  VARCHAR ( 30 ),
  email     VARCHAR ( 255 )
);

DROP TABLE IF EXISTS team;
CREATE TABLE team (
    team_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    team_name VARCHAR ( 30 ),
    active BOOLEAN 
    );

DROP TABLE IF EXISTS league_results;
CREATE TABLE league_results (
    season INTEGER NOT NULL,
    team_id INTEGER REFERENCES team(team_id),
    finish_place INTEGER NOT NULL,
    PRIMARY KEY (season, team_id),
    CHECK (finish_place > 0)
);

DROP TABLE IF EXISTS players;
CREATE TABLE players (
    player_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    external_id VARCHAR(50) NOT NULL UNIQUE,
    name TEXT NOT NULL,
    position TEXT NOT NULL CHECK ( position IN (
        'C',
        '1B',
        'SP',
        'RP',
        '2B'
        'SS'
        '3B'
        'OF'
        'DH'
        'UTIL'
    ))
);


DROP TABLE IF EXISTS tx_history;
CREATE TABLE tx_history(
    tx_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    team_id BIGINT NOT NULL
        REFERENCES team(team_id)
        ON DELETE RESTRICT,    
    player_id BIGINT NOT NULL
        REFERENCES players(player_id)
        ON DELETE RESTRICT,
    season INTEGER NOT NULL CHECK ( season BETWEEN 2000 AND 2200),
    tx_instant TIMESTAMPTZ NOT NULL DEFAULT now(),
        -- Destination team; NULL indicates player is not rostered (DROP/FA)
    to_team_id INTEGER NULL
        REFERENCES team(team_id)
        ON DELETE RESTRICT,
    from_team_id INTEGER NULL
        REFERENCES team(team_id)
        ON DELETE RESTRICT,
    tx_type TEXT NOT NULL CHECK (tx_type IN (
        'ADD',        -- player added to a team
        'TRADE',      -- player moved from one team to another
        'DROP',       -- player removed (to_team_id must be NULL)
        'PROMOTE',    -- minors -> active (same team)
        'DEMOTE'      -- active -> minors (same team)
    )),
        -- Contract carries over on trade: record the same contract_end_season when traded.
    contract_end_season INTEGER NULL CHECK (contract_end_season BETWEEN 1800 AND 2500),

    salary INTEGER NULL CHECK (salary >= 0),
    is_minors BOOLEAN NOT NULL DEFAULT FALSE,

    acq_method TEXT NULL CHECK (acq_method IN (
        'Draft',
        'Trade',
        'FranchiseTag',
        'Minor League',
        'Draft or graduation'
    )),
    note TEXT NULL,

    -- Contract end must be present whenever the player is rostered after this transaction
    CHECK (
      (to_team_id IS NULL AND contract_end_season IS NULL)
      OR
      (to_team_id IS NOT NULL AND contract_end_season IS NOT NULL AND contract_end_season >= season)
    ),

    -- DROP must have NULL destination
    CHECK (
      tx_type <> 'DROP' OR to_team_id IS NULL
    ),

    -- TRADE should move between two different teams
    CHECK (
      tx_type <> 'TRADE'
      OR (from_team_id IS NOT NULL AND to_team_id IS NOT NULL AND from_team_id <> to_team_id)
    )
);

DROP TABLE IF EXISTS rosters;
CREATE TABLE rosters(
    team_id BIGINT NOT NULL
        references team(team_id)
        ON DELETE RESTRICT,    
    player_id BIGINT NOT NULL
        references players(player_id)
        ON DELETE RESTRICT,
    season INTEGER NOT NULL CHECK ( season BETWEEN 2000 AND 2200),
    contract_end_season INTEGER NOT NULL CHECK ( season BETWEEN 2000 AND 2200),
    salary INTEGER,
    is_minors BOOLEAN NOT NULL DEFAULT FALSE,
    last_tx_id BIGINT REFERENCES tx_history(tx_id)
);



`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://tylerbehle@localhost:5432/dynasty_baseball",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
