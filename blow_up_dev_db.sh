#!/bin/bash
psql -d slothy_development -c "drop schema public cascade; create schema public; grant all on schema public to postgres; grant all on schema public to public; grant all on schema public to stefan;"