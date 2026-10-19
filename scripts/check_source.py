from pathlib import Path
import hashlib,json
expected,path=Path('SOURCE_SHA256.txt').read_text().split()
actual=hashlib.sha256(Path(path).read_bytes()).hexdigest()
assert expected==actual,(expected,actual)
assert json.loads(Path('deployment.json').read_text())['source_sha256']==actual
print('Canonical source SHA256:',actual)
