-- set path to audio files
SELECT set_config('path.audiofile', 'http://thecolrc.org:80/files/files/texts/', FALSE);
-- SELECT current_setting('path.audiofile')

-- set path to elicitation files
SELECT set_config('path.elicitationfile', 'http://thecolrc.org:80/files/files/elicitations/', FALSE);
-- SELECT current_setting('path.elicitationfile')

-- set path to textfiles
SELECT set_config('path.textfile', 'http://thecolrc.org:80/files/files/texts/', FALSE);
-- SELECT current_setting('path.textfile')

-- set path to textimages
SELECT set_config('path.textimage', 'http://thecolrc.org:80/files/files/texts/', FALSE);
-- SELECT current_setting('path.textimage')