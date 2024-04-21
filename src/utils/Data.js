import test from "assets/models/Test.glb";
import piano from "assets/models/Piano.glb";
import piano2 from "assets/models/PianoBlack.glb";
import Gui from "assets/models/Gui3.glb";
import Synth from "assets/models/Synth.glb";
import DrumStick from "assets/models/DrumStick.glb";
import Speaker from "assets/models/Speaker.glb";
import PainoModel from "assets/models/PainoModel.glb";
import Gui4 from "assets/models/Gui4.glb";
import Mic from "assets/models/Mic.glb";
import Flying from "assets/models/Flying.glb";
import Speaker2 from "assets/models/Speaker4.glb";
import Flute from "assets/models/Flute2.glb";
import Piano4 from "assets/models/Piano4.glb";
import Mic2 from "assets/models/Mic2.glb";
import sheenchair from "assets/models/sheenchair.usdz";

const productItems = [
  {
    id: 1,
    name: "Sheen Chair",
    modelSrc: test,
    iOSSrc: sheenchair,
    category: "Furniture",
    color: "Orange",
    annotations: [
      {
        title: "comfortable-back",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "comfortable-seat",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 2,
    name: "Office Chair",
    modelSrc: piano,
    category: "Furniture",
    color: "Orange",
    annotations: [
      {
        title: "comfortable-back",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "comfortable-seat",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 3,
    name: "pot",
    modelSrc: piano2,
    category: "Environment",
    color: "Red",
    annotations: [
      {
        title: "pot-structure",
        slot: "hotspot-1",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 4,
    name: "Painting",
    modelSrc: Synth,
    category: "Art",
    color: "Brown",
    annotations: [
      {
        title: "wooden-frame",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "pure-canvas",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  
  {
    id: 6,
    name: "Sport Car",
    modelSrc: DrumStick,
    category: "Vehicle",
    color: "Red",
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },  {
    id: 8,
    name: "Sport ee",
    modelSrc: Speaker,
    category: "Vehicle",
    color: "Red",
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },  {
    id: 9,
    name: "Sport ee",
    modelSrc: PainoModel,
    category: "Vehicle",
    color: "Red",
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },{
    id: 9,
    name: "Sport ee",
    modelSrc: Gui4,
    category: "Vehicle",
    color: "Red",
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },{
    id: 9,
    name: "Sport ee",
    modelSrc: Mic,
    category: "Vehicle",
    color: "Red",
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },{
    id: 9,
    name: "Sport ee",
    modelSrc: Flying,
    category: "Vehicle",
    color: "Red",
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 9,
    name: "Sport ee",
    modelSrc: Speaker2,
    category: "Vehicle",
    color: "Red",
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 9,
    name: "Sport ee",
    modelSrc: Flute,
    category: "Vehicle",
    color: "Red",
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 9,
    name: "Sport ee",
    modelSrc: Piano4,
    category: "Vehicle",
    color: "Red",
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 9,
    name: "Sport ee",
    modelSrc: Mic2,
    category: "Vehicle",
    color: "Red",
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
];
export default productItems;
