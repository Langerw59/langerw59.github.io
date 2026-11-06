@echo off
rem SprachBox DE-IT: mp3-Aufnahmen erzeugen (Doppelklick genuegt)
cd /d "%~dp0.."
python -m pip install --quiet --upgrade edge-tts
python tools\make_audio_de_it.py %*
pause
