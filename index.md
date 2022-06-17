# DigiblockSim

A digital electronic editor and simulator for learning. Its local web based and we still working on it.

Use Verilog files to create new **blocks** and combine together with wires or buses. Moreover you have special blocks like Control-Block or diferents input/outputs blocks.

Next you can export it to an FPGA, or simulate it. We used [Verilator](https://www.veripool.org/verilator/) for this purpose.

## Project status

Work in progress

## Blocks

A representation of a digital circuit. Its like a Verilog module and it have io ports.

You can use it by select one and clik in the canvas. With this, you have instanciate a block.

### Blocks.json

This file store all blocks.

### Block definition

```
{
  id: '',            // Filename without extension (.v)
  moduleName: '',    // Get from Verilog file
  hash: '',          // Of Verilog file in Base64
  parameters: [],    // Of parameters objects
  ports: [],         // Of ports objects
  type: '',          // 'normal', 'control'...
  size: { 
          width: 0, 
          height: 0 
        },
  label: ''          // Choose by the user, by default moduleName
}
```

### Blocks internal API

#### CreateBlock

#### GetBlock

#### GetBlocks

#### UpdateBlock

#### DeleteBlock

#### ExportBlocks

#### ImportBlocks
