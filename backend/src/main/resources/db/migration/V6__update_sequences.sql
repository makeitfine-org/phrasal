SELECT setval('phrasal_verbs_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM phrasal_verbs));
SELECT setval('grammar_entries_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM grammar_entries));
