

## Huizinga
- Homo Ludens does not provide a specific classification and description of games. 
- Huizinga focuses instead on the importance of the role of play in the development of civilization. For this reason, he classifies games into four broad categories.

## Roger Caillois, Games and Men, Masks and Vertigo, Mexico, FCE. (1986)
- play is an activity characterized by *being free*, *separate from reality*, uncertain, unproductive, regulated, and fictitious:
	- *Free*: no one can force you to play; it is a free and voluntary activity.
	- *Separate from reality*: it is separated from everyday life in a specific space and time.
	- *Uncertain*: the outcome of the game is not determined; doubt plays a fundamental role.
	- *Unproductive*: no goods or wealth are created outside the game; when it ends, things start again as they did the first time.
	- *Regulated*: it has precise, arbitrary, non-ordinary rules for carrying out the activity.
	- *Fictitious*: a **secondary reality** in which the game is played, fantasy is the main element.

Caillois makes a primary classification of games, in which there are only two categories:
·**Paidia**: activities related to fun, with improvisation, full of fantasy, commonly known as children's games.
·**Ludus**: activities with difficulty in reaching the final result, involving ingenuity, skill, dexterity, and patience. They have more complex rules.

Within these two opposite poles, we find a subcategory of games related to the predominance of competition, chance, simulation, or vertigo:
·**Agon** (competition): These are games that appear as a struggle where artificial equality is created, with antagonists facing each other under ideal conditions. These types of games require training, discipline, and perseverance. Examples: soccer, chess.
·**Alea** (luck): In these games, participants try to be favored by fate. They serve to abolish the natural or acquired qualities of individuals, leaving them on an absolutely equal footing in the face of luck. It is chance. Examples: dice, coin tossing.
·**Mimicry**: The subject plays at believing, at making themselves believe or making others believe that they are different from themselves. It is not regulated; this characteristic is replaced by the concealment of reality and the simulation of a second reality, the act of "pretending." Examples: theatrical performance and dramatic interpretation.
·**Ilinx** (vertigo): This brings together games that consist of an attempt to destroy the stability of perception for a moment and inflict a kind of voluptuous panic on the lucid consciousness, that is, players seek to stun themselves by abruptly annihilating reality. Example: spinning around, Six Flags, amusement park rides.

**Opposition between agon and alea**: There are exceptions such as cards or dominoes, which combine agon and alea, since the hand is obtained by luck and its use depends on skill.

From turbulence to rules: When the game acquires an institutional existence, the rules become part of its nature, becoming a fertile and decisive instrument of culture. Games exemplify the moral and intellectual values of a culture, as well as contributing to their refinement and development.



```mermaid
flowchart LR

%% ROOT
A[Play]

%% CHARACTERISTICS
subgraph Characteristics of Play
C1[Free]
C2[Separate from reality]
C3[Uncertain]
C4[Unproductive]
C5[Regulated]
C6[Fictitious]
end

A --> C1
A --> C2
A --> C3
A --> C4
A --> C5
A --> C6

%% PRIMARY AXIS
subgraph Primary Poles
P1[Paidia<br/>improvisation, fantasy, spontaneity]
P2[Ludus<br/>rules, difficulty, discipline]
end

A --> P1
A --> P2

P1 <-->|opposition| P2

%% GAME FORMS
subgraph Game Forms
G1[Agon<br/>competition]
G2[Alea<br/>chance]
G3[Mimicry<br/>simulation]
G4[Ilinx<br/>vertigo]
end

P1 --> G1
P1 --> G2
P1 --> G3
P1 --> G4

P2 --> G1
P2 --> G2
P2 --> G3
P2 --> G4

%% OPPOSITIONS
G1 <-->|opposition| G2

%% MIXED CASE
M[Mixed games<br/>cards, dominoes]
G1 --> M
G2 --> M

%% CULTURAL EVOLUTION
subgraph Cultural Development
D1[Turbulence and improvisation]
D2[Institutionalization of rules]
D3[Games reflect cultural values]
end

P1 --> D1
D1 --> D2
D2 --> D3
P2 --> D2

%% COLORS
classDef root fill:#f4f4f4,stroke:#333,stroke-width:2px,color:#000
classDef characteristic fill:#e3f2fd,stroke:#1e88e5,color:#000
classDef paidia fill:#ffe082,stroke:#f9a825,color:#000
classDef ludus fill:#c5e1a5,stroke:#558b2f,color:#000
classDef agon fill:#ef9a9a,stroke:#b71c1c,color:#000
classDef alea fill:#ce93d8,stroke:#6a1b9a,color:#000
classDef mimicry fill:#80deea,stroke:#006064,color:#000
classDef ilinx fill:#ffcc80,stroke:#ef6c00,color:#000
classDef mixed fill:#d7ccc8,stroke:#5d4037,color:#000
classDef culture fill:#e1bee7,stroke:#4a148c,color:#000

class A root

class C1,C2,C3,C4,C5,C6 characteristic

class P1 paidia
class P2 ludus

class G1 agon
class G2 alea
class G3 mimicry
class G4 ilinx

class M mixed

class D1,D2,D3 culture
```
