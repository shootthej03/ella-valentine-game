const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: { preload, create, update }
};
new Phaser.Game(config);

let ella, cursors, keyE;
let notes, notesCollected = 0;
let stage = 0;
let dialogueText;

const dialogues = [
  "Ella: Where are you, Trey…?",
  "Note: I love you 💗",
  "Note: Hey pretty girl",
  "Note: You are my favorite person",
  "Note: I’m so proud of you",
  "Note: You mean everything to me",
  "Ella: Maybe the airport will lead me to you…",
  "The forest is dark… but Emma and Hannah appear 🐾",
  "Emma & Hannah: *meow* Don’t be scared.",
  "Ella: Cape Cod is beautiful… but I’m still hungry.",
  "Emma & Hannah help Ella catch fish 🐟",
  "Ella: Flowers… Trey would love these.",
  "Lyndsey: I found him. He’s in Jacksonville.",
  "Ella arrives in Jacksonville.",
  "Mom: Hi Ella 💗",
  "Dad: We’re happy to see you.",
  "Parker: You just missed him!",
  "Jordan: He went to the Jaguars game!",
  "Ella: TREY!!!",
  "Trey: ELLA!!!",
  "They jump into each other’s arms 💖",
  "Final Scene: A romantic dinner together.",
  "Trey: I’d search the world for you. Happy Valentine’s Day 💕"
];

function preload() {
  this.load.image('ella', 'assets/ella.png');
  this.load.image('trey', 'assets/trey.png');
  this.load.image('kitty', 'assets/kitty.png');
  this.load.image('dog', 'assets/dog.png');
  this.load.image('note', 'assets/note.png');
  this.load.image('family', 'assets/family.png');
}

function create() {
  this.cameras.main.setBackgroundColor('#87ceeb');
  ella = this.physics.add.sprite(400, 300, 'ella');
  ella.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();
  keyE = this.input.keyboard.addKey('E');

  notes = this.physics.add.group();
  for (let i=0;i<5;i++){
    let x=100+i*120; let y=100+(i%2)*150;
    let note=notes.create(x,y,'note'); note.setInteractive();
  }

  dialogueText=this.add.text(20,450,dialogues[0],{font:'18px monospace',fill:'#ffc0cb',wordWrap:{width:760}});
  this.physics.add.overlap(ella, notes, collectNote, null, this);
}

function collectNote(ella,note){
  note.disableBody(true,true);
  notesCollected++;
  dialogueText.setText(`Notes collected: ${notesCollected}/5`);
  if(notesCollected===5 && stage<dialogues.length){stage++; dialogueText.setText(dialogues[stage]);}
}

function update(){
  ella.setVelocity(0);
  if(cursors.left.isDown)ella.setVelocityX(-180);
  if(cursors.right.isDown)ella.setVelocityX(180);
  if(cursors.up.isDown)ella.setVelocityY(-180);
  if(cursors.down.isDown)ella.setVelocityY(180);
  if(Phaser.Input.Keyboard.JustDown(keyE)){stage++; if(stage<dialogues.length) dialogueText.setText(dialogues[stage]);}
}
