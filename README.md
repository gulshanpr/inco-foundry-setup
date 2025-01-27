## just tring to compile inco's template on foundry

if you want to setup foundry for your INCO project, just install forge install `https://github.com/Inco-fhevm/fhevm` with --no-commit flag and adjust the remappings.

```
remappings = [
    "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
    "fhevm/=lib/fhevm"
]
```
