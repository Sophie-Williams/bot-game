namespace.module('bot.itemref', function (exports, require) {
    var log = namespace.bot.log;
    var prob = namespace.bot.prob;

    function gearSlotFormula(classLevel, itemLevel) {
        return Math.min(Math.floor(1 + classLevel + itemLevel / 10), 10);
    }

    var BASE_MELEE_RANGE = 100000
    var BASE_RANGE_RANGE = 700000
    var BASE_SPELL_RANGE = 500000
    
    var ref = {
        "weapon": {
            "melee": {
                "mods": [
                    {def: 'physDmg added 3', type: 'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},
                    {def: 'physDmg more 1 perLevel', type: 'dmg'}
                ],
                "getClassMods": function(classLevel) {
                    return [{def: 'physDmg added ' + Math.floor(Math.pow(2 + classLevel, 2)), type: 'dmg'}];
                },
                "slotFormula": gearSlotFormula,
                "names": ["cardboard sword", "ass axe", "master sword"]
            },
            "range": {
                "mods": [
                    {def: 'physDmg added 3', type: 'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},
                    {def: 'physDmg more 1 perLevel', type: 'dmg'}
                ],
                "getClassMods": function(classLevel) {
                    return [{def: 'physDmg added ' + Math.floor(Math.pow(2 + classLevel, 2)), type: 'dmg'}];
                },
                "slotFormula": gearSlotFormula,
                "names": ["shitty bow", "wooden bow", "compound bow"]
            },
            "spell": {
                "mods": [
                    {def: 'spellDmg added 10', type: 'dmg'},
                    {def: 'spellDmg added 3 perLevel', type: 'dmg'},
                ],
                "getClassMods": function(classLevel) {
                    return [{def: 'spellDmg added ' + Math.floor(Math.pow(3 + classLevel, 2)), type: 'dmg'}];
                },
                "slotFormula": gearSlotFormula,
                "names": ["shitty wand", "crappy wand", "compound wand"]
            }
        },
        "armor": {
            "head": {
                "mods": [
                    {def: 'armor added 5', type: 'def'},
                    //{def: 'armor more 1 perLevel', type: 'def'},
                    {def: 'armor added 1 perLevel', type: 'def'},
                ],
                "getClassMods": function(classLevel) {
                    return [{def: 'armor added ' + Math.floor(Math.pow(1 + classLevel, 2)), type: 'def'}];
                },
                "slotFormula": gearSlotFormula,
                "weight": 1,
                "names": ["balsa helmet", "collander", "bucket"]
            },
            "chest": {
                "mods": [
                    {def: 'armor added 5', type: 'def'},
                    //{def: 'armor more 1 perLevel', type: 'def'},
                    {def: 'armor added 1 perLevel', type: 'def'},
                ],
                "getClassMods": function(classLevel) {
                    return [{def: 'armor added ' + Math.floor(Math.pow(1 + classLevel, 2)), type: 'def'}];
                },
                "slotFormula": gearSlotFormula,
                "weight": 2,
                "names": ["t-shirt", "foamcore tunic", "steel breastplate"]
            },
            "legs": {
                "mods": [
                    {def: 'armor added 5', type: 'def'},
                    //{def: 'armor more 1 perLevel', type: 'def'},
                    {def: 'armor added 1 perLevel', type: 'def'},
                ],
                "getClassMods": function(classLevel) {
                    return [{def: 'armor added ' + Math.floor(Math.pow(1 + classLevel, 2)), type: 'def'}];
                },
                "slotFormula": gearSlotFormula,
                "weight": 2,
                "names": ["cardboard kneepads", "jeans", "platemail leggings"]
            },
            "hands": {
                "mods": [
                    {def: 'armor added 5', type: 'def'},
                    //{def: 'armor more 1 perLevel', type: 'def'},
                    {def: 'armor added 1 perLevel', type: 'def'},
                ],
                "getClassMods": function(classLevel) {
                    return [{def: 'armor added ' + Math.floor(Math.pow(1 + classLevel, 2)), type: 'def'}];
                },
                "slotFormula": gearSlotFormula,
                "weight": 1,
                "names": ["latex gloves", "gardening gloves", "chainmail gloves"]
            }
        },
        /*
            "hot sword": {
                "slot": "weapon",
                "levels": 10,
                "modType": "added",
                "stat": "fireDmg",
                "perLevel": 2
            },
            "surprisingly hot sword": {
                "slot": "weapon",
                "levels": 10,
                "modType": "more",
                "stat": "fireDmg",
                "perLevel": 1
            },
            {base: [], perLevel: 'fireDmg more 1'}

          added
          converted increased % of other
          converted decreased % of max
          more

          hatred 50% phys as cold
          phys to light 50% physical converted to light
          cold to fire 50%  cold converted to fire

          100 phys (after added and more), 0 of else

          phys to light:
          100 (-50) phys
          50 light


          hatred:
          phys is 50
          cold 25

          cold to fire:
          25 - 12.5 cold
          12.5 fire

          50 phys
          50 light
          12.5 cold
          12.5 fire
          0 pois

            "hot sword": {
                "slot": "weapon",
                "levels": 10,
                "mods": [
                {def: 'fireDmg added 2 perLevel', type: 'dmg'},
                {def: 'fireDmg more 1 perLevel', type: 'dmg'}
                ]
            },

          itemref has this format:
          mods: [
          ['fireDmg more 100', 'dmg'],
          ['physDmg converted 50 fireDmg', 'dmg'],
          ['fireDmg more 1 perLevel', 'dmg']
          ]

          [
          ['physDmg more 100', 'dmg'],
          ['physDmg added 5 perLevel', 'dmg']
          ]

          compileCards converts to this:

          primary verb amt special(perLevel / element inc ase of converted and gainedas)

          

          hatred:

          {base: ['physDmg gainedas coldDmg 50'], perLevel: 'physDmg gainedas 2 coldDmg'}
          
         */

        /*
          basic range skill:

          proj 1
          start 50

          lmp card:

          dmg -20
          proj 2


          basic melee skill:

          melee 1
          start 50

          melee splash:

          aoe 5000
          dmg -20
         */

        "attack": {
            "melee": {
                "type": "melee",
            },
            "range": {
                "type": "range",
                // int projSpeed, int count, int angle (if count > 1)
            },
            "cone": {
                "type": "cone",
                "angle": 30,
            },
            "circle": {
                "type": "circle",
            }
        },

        "skill": {
            "basic": {
            },
            "basic melee": {
                "prototype": ["basic"],
                "class": "melee",
                "types": ["melee"],
                "specs": [{ type: 'melee', radius: 10000, color: '#777', mods: [], onHit: [], onKill: [], onRemove: [] }],
                "baseMods": [
                    {def: 'speed added 500', type: 'dmg'},
                    {def: 'range added ' + BASE_MELEE_RANGE, type: 'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},
                ]
            },
            "basic range": {
                "prototype": ["basic"],
                "class": "range",
                "types": ["proj"],
                "specs": [{ type: 'proj', radius: 5000, color: '#a52a2a', rate: 1000, mods: [], onHit: [], onKill: [], onRemove: [] }],
                "baseMods": [
                    {def: 'speed added 500', type: 'dmg'},
                    {def: 'range added ' + BASE_RANGE_RANGE, type: 'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},                    
                ]
            },
            "basic spell": {
                "prototype": ["basic"],
                "class": "spell",
                "types": ["proj"],
                "specs": [{ type: 'proj', radius: 5000, color: '#a52a2a', rate: 1000, mods: [], onHit: [], onKill: [], onRemove: [] }],
                "baseMods": [
                    {def: 'speed added 500', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE, type: 'dmg'},
                    {def: 'physDmg added 3', type: 'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},
                ]
            },
            "super smash": {
                "prototype": ["basic melee"],
                "baseMods": [
                    {def: 'manaCost added 3', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 300', type: 'dmg'},
                    {def: 'range added ' + BASE_MELEE_RANGE * 1.5, type: 'dmg'},                    
                    {def: 'physDmg more 10', type: 'dmg'},
                    {def: 'physDmg more 1 perLevel', type: 'dmg'},
                    {def: 'physDmg added 2 perLevel', type: 'dmg'}
                ]
            },
            "masterful strike": {
                "prototype": ["basic melee"],
                "baseMods": [
                    {def: 'manaCost added 12', type: 'dmg'},
                    {def: 'speed added 1000', type: 'dmg'},
                    {def: 'range added ' + BASE_MELEE_RANGE * 1.5, type: 'dmg'},
                    {def: 'physDmg more 20', type: 'dmg'},
                    {def: 'physDmg more 2 perLevel', type: 'dmg'},
                    {def: 'physDmg added 5 perLevel', type: 'dmg'}
                ]
            },
            "quick hit": {
                "prototype": ["basic melee"],
                "baseMods": [
                    {def: 'manaCost added 5', type: 'dmg'},
                    {def: 'speed added 250', type: 'dmg'},
                    {def: 'range added ' + BASE_MELEE_RANGE * 1.5, type: 'dmg'},
                ]
            },
            "fire slash": {
                "prototype": ["basic melee"],
                "types": ["melee", "fire"],
                "anim": ["#f00"],
                "baseMods": [
                    {def: 'manaCost added 3', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 300', type: 'dmg'},
                    {def: 'range added ' + BASE_MELEE_RANGE * 1.5, type: 'dmg'},                    
                    {def: 'fireDmg more 1 perLevel', type: 'dmg'},
                    {def: 'fireDmg added 1 perLevel', type: 'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},                    
                    {def: 'physDmg converted 60 fireDmg', type: 'dmg'}
                ]
            },
            "exploding strike": {
                "prototype": ["basic melee"],
                "types": ["melee", "fire"],
                "specs": [{ type: 'melee', mods: [],
                          onHit: [{ type: 'circle', mods: [{def: 'physDmg more -20', type: 'dmg'}], onHit: [], onKill: [], onRemove: []}],
                          onKill: [],
                          onRemove: []
                        }],
                "onHit": ["AOECircle -20 1000"],
                "baseMods": [
                    {def: 'manaCost added 3', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 300', type: 'dmg'},
                    {def: 'range added ' + BASE_MELEE_RANGE * 1.5, type: 'dmg'},                    
                    {def: 'fireDmg more 1 perLevel', type: 'dmg'},
                    {def: 'fireDmg added 1 perLevel', type: 'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},                    
                    {def: 'physDmg converted 60 fireDmg', type: 'dmg'}
                ]
            },
            "ice slash": {
                "prototype": ["basic melee"],
                "types": ["melee", "cold"],
                "anim": ["#00f"],
                "baseMods": [
                    {def: 'manaCost added 5', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 300', type: 'dmg'},
                    {def: 'range added ' + BASE_MELEE_RANGE * 1.5, type: 'dmg'},                    
                    {def: 'coldDmg more 1 perLevel', type: 'dmg'},
                    {def: 'coldDmg added 1 perLevel', type: 'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},                                        
                    {def: 'physDmg converted 60 coldDmg', type: 'dmg'}
                ]
            },
            "lightning slash": {
                "prototype": ["basic melee"],
                "types": ["melee", "lightning"],
                "anim": ["#ff0"],
                "baseMods": [
                    {def: 'manaCost added 5', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 300', type: 'dmg'},
                    {def: 'range added ' + BASE_MELEE_RANGE * 1.5, type: 'dmg'},                    
                    {def: 'lightDmg more 1 perLevel', type: 'dmg'},
                    {def: 'lightDmg added 1 perLevel', type: 'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},                                        
                    {def: 'physDmg converted 60 lightDmg', type: 'dmg'}
                ]
            },
            "poison slash": {
                "prototype": ["basic melee"],
                "types": ["melee", "poison"],
                "anim": ["#0f0"],
                "baseMods": [
                    {def: 'manaCost added 5', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 300', type: 'dmg'},
                    {def: 'range added ' + BASE_MELEE_RANGE * 1.5, type: 'dmg'},                    
                    {def: 'poisDmg more 1 perLevel', type: 'dmg'},
                    {def: 'poisDmg added 1 perLevel', type: 'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},                                        
                    {def: 'physDmg converted 60 poisDmg', type: 'dmg'}
                ]
            },
            "speed shot": {
                "prototype": ["basic range"],
                "class": "range",
                "types": ["proj"],
                "baseMods": [
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_RANGE_RANGE, type: 'dmg'},
                ]
            },
            "fire arrow": {
                "prototype": ["basic range"],
                "class": "range",
                "types": ["proj", "fire"],
                "anim": ["#f00"],
                "baseMods": [
                    {def: 'manaCost added 6', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_RANGE_RANGE, type: 'dmg'},
                    {def: 'fireDmg more 1 perLevel', type: 'dmg'},
                    {def: 'physDmg converted 50 fireDmg', type: 'dmg'}
                ]
            },
            "cold arrow": {
                "prototype": ["basic range"],
                "class": "range",
                "types": ["proj", "cold"],
                "anim": ["#00f"],
                "baseMods": [
                    {def: 'manaCost added 6', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_RANGE_RANGE, type: 'dmg'},
                    {def: 'coldDmg more 1 perLevel', type: 'dmg'},
                    {def: 'physDmg converted 50 coldDmg', type: 'dmg'}
                ]
            },
            "lightning arrow": {
                "prototype": ["basic range"],
                "class": "range",
                "types": ["proj", "lightning"],
                "anim": ["#ff0"],
                "baseMods": [
                    {def: 'manaCost added 6', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_RANGE_RANGE, type: 'dmg'},
                    {def: 'lightDmg more 1 perLevel', type: 'dmg'},
                    {def: 'physDmg converted 50 lightDmg', type: 'dmg'}
                ]
            },
            "poison arrow": {
                "prototype": ["basic range"],
                "class": "range",
                "types": ["proj", "poison"],
                "anim": ["#0f0"],
                "baseMods": [
                    {def: 'manaCost added 6', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_RANGE_RANGE, type: 'dmg'},
                    {def: 'poisDmg more 1 perLevel', type: 'dmg'},
                    {def: 'physDmg converted 50 poisDmg', type: 'dmg'}
                ]
            },
            "headshot": {
                "prototype": ["basic"],
                "class": "range",
                "types": ["proj"],
                "baseMods": [
                    {def: 'manaCost added 6', type: 'dmg'},
                    {def: 'speed added 1000', type: 'dmg'},
                    {def: 'range added ' + BASE_RANGE_RANGE, type: 'dmg'},
                    {def: 'physDmg more 10 perLevel', type: 'dmg'}
                ]
            },
            "incinerate": {                
                "prototype": ["basic spell"],
                "class": "spell",
                "types": ["proj", "fire", "spell"],
                "anim": ["#f00"],
                "baseMods": [
                    {def: 'manaCost added 3', type: 'dmg'},
                    {def: 'speed added 50', type: 'dmg'},
                    {def: 'range added ' + BASE_RANGE_RANGE * 0.3, type: 'dmg'},
                    {def: 'fireDmg added 2', type: 'dmg'},
                    {def: 'fireDmg added 2 perLevel', type: 'dmg'},
                    {def: 'physDmg converted 100 fireDmg', type: 'dmg'}
                ]
            },
            "fire ball": {
                "prototype": ["basic spell"],
                "class": "spell",
                "types": ["proj", "fire", "spell"],
                "anim": ["#f00"],
                "baseMods": [
                    {def: 'manaCost added 7', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 500', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE, type: 'dmg'},
                    {def: 'fireDmg added 3 perLevel', type: 'dmg'},
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'fireDmg added 3', type: 'dmg'},
                    {def: 'fireDmg more 1 perLevel', type: 'dmg'},
                ],
                "flavor": "Goodness gracious, these balls are great!"
            },
            "ice ball": {
                "prototype": ["basic spell"],
                "class": "spell",
                "types": ["proj", "cold", "spell"],
                "anim": ["#00f"],
                "baseMods": [
                    {def: 'manaCost added 7', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 500', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE, type: 'dmg'},
                    {def: 'coldDmg added 3 perLevel', type: 'dmg'},
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'coldDmg added 3', type: 'dmg'},
                    {def: 'coldDmg more 1 perLevel', type: 'dmg'},

                ]
            },

            "lightning ball": {
                "prototype": ["basic spell"],
                "class": "spell",
                "types": ["proj", "lightning", "spell"],
                "anim": ["#ff0"],
                "baseMods": [
                    {def: 'manaCost added 7', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 500', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE, type: 'dmg'},
                    {def: 'lightDmg added 3 perLevel', type: 'dmg'},
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'lightDmg added 3', type: 'dmg'},
                    {def: 'lightDmg more 1 perLevel', type: 'dmg'},
                ]
            },
            "poison ball": {
                "prototype": ["basic spell"],
                "class": "spell",
                "types": ["proj", "poison", "spell"],
                "anim": ["#0f0"],
                "baseMods": [
                    {def: 'manaCost added 7', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 500', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE, type: 'dmg'},
                    {def: 'poisDmg added 3 perLevel', type: 'dmg'},
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'poisDmg added 3', type: 'dmg'},
                    {def: 'poisDmg more 1 perLevel', type: 'dmg'},
                ]
            },
            "ice blast": {
                "prototype": ["basic spell"],
                "class": "spell",
                "types": ["proj", "cold", "spell"],
                "anim": ["#00f"],
                "onTry": ["AOECone 0 5000 45"],
                "baseMods": [
                    {def: 'manaCost added 7', type: 'dmg'},
                    {def: 'cooldownTime added 600', type: 'dmg'},
                    {def: 'speed added 500', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE, type: 'dmg'},
                    {def: 'coldDmg added 3 perLevel', type: 'dmg'},
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'coldDmg added 3', type: 'dmg'},
                    {def: 'coldDmg more 1 perLevel', type: 'dmg'},
                ]
            },
            "pressure wave": {
                "prototype": ["basic"],
                "class": "spell",
                "types": ["proj", "spell"],
                "baseMods": [
                    {def: 'manaCost added 10', type: 'dmg'},
                    {def: 'cooldownTime added 500', type: 'dmg'},
                    {def: 'speed added 500', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE, type: 'dmg'},
                    {def: 'physDmg added 5 perLevel', type: 'dmg'},
                ]
            },
            "shadow dagger": {
                "prototype": ["basic"],
                "class": "spell",
                "types": ["proj", "spell"],
                "baseMods": [
                    {def: 'manaCost added 10', type: 'dmg'},
                    {def: 'cooldownTime added 500', type: 'dmg'},
                    {def: 'speed added 500', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE, type: 'dmg'},
                    {def: 'physDmg added 5 perLevel', type: 'dmg'},
                ]
            },
            "health suck": {
                "prototype": ["basic"],
                "class": "spell",
                "types": ["proj", "spell"],
                "baseMods": [
                    {def: 'manaCost added 1', type: 'dmg'},
                    {def: 'speed added 150', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE, type: 'dmg'},
                    {def: 'physDmg added 9', type:'dmg'},
                    {def: 'physDmg added 1 perLevel', type: 'dmg'},
                    {def: 'physDmg gainedas 100 hpLeech', type: 'dmg'}
                ]
            },
            "ice blast": {
                "prototype": ["basic"],
                "class": "spell",
                "types": ["proj", "aoecone" , "spell"],
                "baseMods": [
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE, type: 'dmg'},
                    {def: 'coldDmg added 3 perLevel', type: 'dmg'},
                ]
            },
            "nova": {
                "prototype": ["basic"],
                "class": "spell",
                "types": ["proj", "aoecircle" , "spell"],
                "baseMods": [
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE/2, type: 'dmg'},
                    {def: 'lightDmg added 3 perLevel', type: 'dmg'},
                ]
            },
            "fire nova": {
                "prototype": ["basic"],
                "class": "spell",
                "types": ["proj", "aoecircle" , "spell"],
                "baseMods": [
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE/2, type: 'dmg'},
                    {def: 'fireDmg added 3 perLevel', type: 'dmg'},
                ]
            },
            "ice nova": {
                "prototype": ["basic"],
                "class": "spell",
                "types": ["proj", "aoecircle" , "spell"],
                "baseMods": [
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE/2, type: 'dmg'},
                    {def: 'coldDmg added 3 perLevel', type: 'dmg'},
                ]
            },
            "poison nova": {
                "prototype": ["basic"],
                "class": "spell",
                "types": ["proj", "aoecircle" , "spell"],
                "baseMods": [
                    {def: 'manaCost added 1 perLevel', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE/2, type: 'dmg'},
                    {def: 'poisDmg added 3 perLevel', type: 'dmg'},
                ]
            },
            "flame cone": {
                "prototype": ["basic"],
                "class": "melee",
                "types": ["aoecone" , "melee"],
                "baseMods": [
                    {def: 'manaCost added 5', type: 'dmg'},
                    {def: 'speed added 200', type: 'dmg'},
                    {def: 'range added ' + BASE_SPELL_RANGE/2, type: 'dmg'},
                    {def: 'fireDmg added 3 perLevel', type: 'dmg'},
                ]
            },
        },
        "card": {
            "proto-skeleton": {
                "mods": [
                    {"def": "fireResist more -20", "type": "eleResist"},
                    {"def": "physDmg more -30", "type": "dmg"},
                    
                ],
            },
            "proto-grunt": {
                "mods": [
                    {"def": "maxHp more -50", "type": "def"},
                    {"def": "physDmg more -30", "type": "dmg"},                    
                ],
            }, 
            "proto-boss": {
                "mods": [
                    {"def": "lineWidth added 1", "type": "vis"},
                    {"def": "width more 100", "type": "vis"},
                    {"def": "height more 100", "type": "vis"},                                        
                    {"def": "physDmg more 100", "type": "dmg"},
                    {"def": "maxHp more 1000", "type": "def"}
                ],
            },
            "proto-rofl": {
                "mods": [
                    {"def": "height more -50", "type": "vis"},                    
                    {"def": "width more 300", "type": "vis"},
                ]
            },
            "proto-elf": {
                "mods": [
                    {"def": "speed more -20", "type": "dmg"},
                    {"def": "dexterity added 50", "type": "def"}
                ],
            },
            "sharpened": {
                "mods": [
                    {"def": "physDmg added 1 perLevel", "type": "dmg"}
                ],
                "slot": "weapon",
                "levels": 10
            },
            "hot sword": {
                "mods": [
                    {"def": "fireDmg added 2 perLevel", "type": "dmg"}
                ],
                "slot": "weapon",
                "levels": 10
            },
            "cold sword": {
                "mods": [
                    {"def": "coldDmg added 2 perLevel", "type": "dmg"}
                ],
                "slot": "weapon",
                "levels": 10
            },
            "surprisingly hot sword": {
                "mods": [
                    {"def": "fireDmg more 1 perLevel", "type": "dmg"}
                ],
                "slot": "weapon",
                "levels": 10
            },
            "honed blade": {
                "mods": [
                    {"def": "physDmg added 2 perLevel", "type": "dmg"}
                ],
                "slot": "weapon",
                "levels": 10
            },

            "breadhat": {
                "mods": [
                    {"def": "armor added 4 perLevel", "type": "def"}
                ],
                "slot": "head",
                "levels": 10
            },            
            "six pack": {
                "mods": [
                    {"def": "lineWidth added 1", "type": "vis"},                                        
                    {"def": "armor added 8 perLevel", "type": "def"}
                ],
                "slot": "chest",
                "levels": 10
            },
            "steel toed": {
                "mods": [
                    {"def": "armor added 4 perLevel", "type": "def"}
                ],
                "slot": "legs",
                "levels": 10
            },
            "extra plating": {
                "mods": [
                    {"def": "armor added 3 perLevel", "type": "def"}
                ],
                "slot": "hands",
                "levels": 10
            },
            
            "quenching blade": {
                "mods": [
                    {"def": "fireResist more -5 perLevel", "type": "eleResist"}
                ],
                "slot": "weapon",
                "levels": 10
            },
            "cool shoes": {
                "mods": [
                    {"def": "fireResist more -5 perLevel", "type": "eleResist"}
                ],
                "slot": "legs",
                "levels": 10
            },
            "compression shorts": {
                "mods": [
                    {"def": "moveSpeed added 50", "type": "def"},
                    {"def": "moveSpeed added 20 perLevel", "type": "def"},
                ],
                "slot": "legs",
                "levels": 10
            },

            "asbestos lining": {
                "mods": [
                    {"def": "fireResist more -5 perLevel", "type": "eleResist"}
                ],
                "slot": "hands",
                "levels": 10
            },
            "sopping underclothes": {
                "mods": [
                    {"def": "fireResist more -5 perLevel", "type": "eleResist"}
                ],
                "slot": "chest",
                "levels": 10
            },

            "brain juice": {
                "mods": [
                    {"def": "manaRegen added 2 perLevel", "type": "def"}
                ],
                "slot": "head",
                "levels": 10
            },
            "heart juice": {
                "mods": [
                    {"def": "hpRegen added 1 perLevel", "type": "def"}
                ],
                "slot": "head",
                "levels": 10
            },
            "head of vigor": {
                "mods": [
                    {"def": "maxHp added 5 perLevel", "type": "def"}
                ],
                "slot": "head",
                "levels": 10
            },
            "nimble": {
                "mods": [
                    {"def": "dodge added 5 perLevel", "type": "def"},
                    {"def": "dodge added 20", "type": "def"}
                ],
                "slot": "chest",
                "levels": 10
            },
            "bloodsucker": {
                "mods": [
                    {"def": "physDmg gainedas 10 hpLeech", "type": "dmg"},
                    {"def": "physDmg added 1 perLevel", "type": "dmg"}
                ],
                "slot": "head",
                "levels": 10
            },
            "strong back": {
                "mods": [
                    {"def": "strength added 5 perLevel", "type": "def"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "thwomping": {
                "mods": [
                    {"def": "physDmg more 5 perLevel", "type": "dmg"},
                    {"def": "physDmg more 50", "type": "dmg"},
                    {"def": "moveSpeed more -5 perLevel", "type": "def"},
                    {"def": "moveSpeed more -75", "type": "def"},
                ],
                "slot": "legs",
                "levels": 10
            },
            "dexterous hands": {
                "mods": [
                    {"def": "dexterity added 5 perLevel", "type": "def"},
                ],
                "slot": "hands",
                "levels": 10
            },
            "dummy" : {
                "mods": [
                    {"def": "moveSpeed added -300", "type": "def"},
                ],
                "slot": "head",
                "levels": 10
            },
            "fear" : {
                "mods": [
                    {"def": "moveSpeed added -400", "type": "def"},
                ],
                "slot": "legs",
                "levels": 10
            },
            "stinging": {
                "mods": [
                    {"def": "physDmg added 1 perLevel", "type": "dmg"},
                ],
                "slot": "skill",
                "levels": 10
            },
            "ignited": {
                "mods": [
                    {"def": "physDmg converted 20 fireDmg", "type": "dmg"},
                    {"def": "fireDmg more 2 perLevel", "type": "dmg"},                    
                ],
                "slot": "weapon",
                "levels": 10
            },
            "frosted": {
                "mods": [
                    {"def": "physDmg converted 20 coldDmg", "type": "dmg"},
                    {"def": "coldDmg more 2 perLevel", "type": "dmg"},                    
                ],
                "slot": "weapon",
                "levels": 10
            },
            "charged": {
                "mods": [
                    {"def": "physDmg converted 20 lightDmg", "type": "dmg"},
                    {"def": "lightDmg more 2 perLevel", "type": "dmg"},                    
                ],
                "slot": "weapon",
                "levels": 10
            },
            "putrified": {
                "mods": [
                    {"def": "physDmg converted 20 poisDmg", "type": "dmg"},
                    {"def": "poisDmg more 2 perLevel", "type": "dmg"},
                ],
                "slot": "weapon",
                "levels": 10
            },
            "heart of granite": {
                "mods": [
                    {"def": "armor added 5 perLevel", "type": "def"},
                    {"def": "armor more 3 perLevel", "type": "def"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "heart of granite": {
                "mods": [
                    {"def": "armor added 5 perLevel", "type": "def"},
                    {"def": "armor more 3 perLevel", "type": "def"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "small stature": {
                "mods": [
                    {"def": "height more -30", "type": "vis"},
                    {"def": "width more -30", "type": "vis"},
                    {"def": "moveSpeed more 3 perLevel", "type": "def"},
                    {"def": "dodge more 3 perLevel", "type": "def"},                    
                ],
                "slot": "chest",
                "levels": 10
            },
            "keen wit": {
                "mods": [
                    {"def": "wisdom added 5 perLevel", "type": "def"},
                ],
                "slot": "head",
                "levels": 10
            },
            "electrified": {
                "mods": [
                    {"def": "lightDmg more 3 perLevel", "type": "dmg"},
                ],
                "slot": "weapon",
                "levels": 10
            },
            "flying": {
                "mods": [
                    {"def": "dodge added 95", "type": "def"},
                    {"def": "dodge added 5 perLevel", "type": "def"},
                    //TODO - flying vis stuff
                ],
                "slot": "chest",
                "levels": 10
            },
            "clawed": {
                "mods": [
                    {"def": "physDmg added 5 perLevel", "type": "dmg"},
                    {"def": "physDmg more 10", "type": "dmg"},
                ],
                "slot": "hands",
                "levels": 10
            },
            "riveted": {               
                "mods": [
                    {"def": "lineWidth added 1", "type": "vis"},                    
                    {"def": "armor more 5 perLevel", "type": "def"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "clockwork": {
                "mods": [
                    {"def": "physDmg more 4 perLevel", "type": "dmg"},
                    {"def": "speed more -15", "type": "dmg"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "mecha heart": {
                "mods": [
                    {"def": "lineWidth added 1", "type": "vis"},                    
                    {"def": "maxHp added 5 perLevel", "type": "def"},
                    {"def": "hpRegen added 2 perLevel", "type": "def"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "steam powered": {
                "mods": [
                    {"def": "manaRegen added 5 perLevel", "type": "def"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "goblin toe": {
                "mods": [
                    {"def": "armor added 10 perLevel", "type": "def"},
                    {"def": "physDmg more 25", "type":"dmg"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "berserking": {
                "mods": [
                    {"def": "physDmg more 25", "type": "dmg"},
                    {"def": "speed more -1 perLevel", "type": "dmg"},                     
                    {"def": "maxHp more -50", "type": "def"},
                ],
                "slot": "head",
                "levels": 10
            },
            "simple minded": {
                "mods": [
                    {"def": "spellDmg more -50", "type": "dmg"},
                    {"def": "strength more 2 perLevel", "type": "def"},
                    {"def": "meleeDmg more 3 perLevel", "type": "dmg"},
                ],
                "slot": "head",
                "levels": 10
            },
            "explosive bolts": {
                "mods": [
                    {"def": "fireDmg more 3 perLevel", "type": "dmg"},
                    {"def": "physDmg converted 25 fireDmg", "type": "dmg"},
                ],
                "slot": "skill",
                "types": ["range"],
                "levels": 10
            },
            "shambling": {
                "mods": [
                    {"def": "moveSpeed more -20", "type": "def"},
                    {"def": "physDmg more 3 perLevel", "type": "dmg"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "unwashed hands": {
                "mods": [
                    {"def": "physDmg converted 25 poisDmg", "type": "dmg"},
                    {"def": "poisDmg more 3 perLevel", "type": "dmg"},
                ],
                "slot": "hands",
                "levels": 10
            },
            "indigenous toxins": {
                "mods": [
                    {"def": "poisDmg added 5 perLevel", "type": "dmg"},
                    {"def": "poisDmg more 3 perLevel", "type": "dmg"},
                ],
                "slot": "skill",
                "levels": 10
            },
            "non-newtownian fluid": {
                "mods": [
                    {"def": "armor added 10 perLevel", "type": "def"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "big": {
                "mods": [
                    {"def": "height more 30", "type": "vis"},
                    {"def": "width more 30", "type": "vis"},                    
                    {"def": "maxHp added 10 perLevel", "type": "def"},
                    {"def": "maxHp more 2 perLevel", "type": "def"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "buff": {
                "mods": [
                    {"def": "width more 30", "type": "vis"},
                    {"def": "lineWidth added 3", "type": "vis"},
                    {"def": "strength added 5 perLevel", "type": "def"},
                    {"def": "meleeDmg more 3 perLevel", "type": "dmg"},
                    {"def": "rangeDmg more 3 perLevel", "type": "dmg"},                    
                ],
                "slot": "chest",
                "levels": 10
            },
            "vampyric touch": {
                "mods": [
                    {"def": "physDmg gainedas 5 hpLeech", "type": "dmg"},
                    {"def": "physDmg more 2 perLevel", "type": "dmg"},
                ],
                "slot": "hands",
                "levels": 10
            },
            "vampyric embrace": {
                "mods": [
                    {"def": "physDmg gainedas 5 hpLeech", "type": "dmg"},
                    {"def": "physDmg more 2 perLevel", "type": "dmg"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "soulsucker": {
                "mods": [
                    {"def": "physDmg gainedas 5 manaLeech", "type": "dmg"},
                    {"def": "physDmg more 2 perLevel", "type": "dmg"},
                ],
                "slot": "head",
                "levels": 10
            },
            "alabaster": {
                "mods": [
                    {"def": "armor more 5 perLevel", "type": "def"},
                    {"def": "armor added 100", "type": "def"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "vest pockets": {
                "mods": [
                    {"def": "speed added -1 perLevel", "type": "dmg"},
                    {"def": "speed more -1 perLevel", "type": "dmg"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "precise": {
                "mods": [
                    {"def": "speed more 20", "type": "dmg"},
                    {"def": "physDmg more 5 perLevel", "type": "dmg"},
                ],
                "slot": "skill",
                "levels": 10
            },
            "fleece lining": {
                "mods": [
                    {"def": "coldResist more -10", "type": "eleResist"},
                    {"def": "coldResist more -1 perLevel", "type": "eleResist"},
                ],
                "slot": "hands",
                "levels": 10
            },
            "fur hat": {
                "mods": [
                    {"def": "coldResist more -10", "type": "eleResist"},
                    {"def": "coldResist more -1 perLevel", "type": "eleResist"},
                ],
                "slot": "head",
                "levels": 10
            },
            "chinchilla lining": {
                "mods": [
                    {"def": "coldResist more -10", "type": "eleResist"},
                    {"def": "coldResist more -1 perLevel", "type": "eleResist"},
                ],
                "slot": "legs",
                "levels": 10
            },
            "yeti fur": {
                "mods": [
                    {"def": "coldResist more -20", "type": "eleResist"},
                    {"def": "coldResist more -1 perLevel", "type": "eleResist"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "ice plating": {
                "mods": [
                    {"def": "armor more 3 perLevel", "type": "def"},
                    {"def": "fireResist more -1 perLevel", "type": "eleResist"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "shadow walker": {
                "mods": [
                    {"def": "dodge added 20 perLevel", "type": "def"},
                ],
                "slot": "legs",
                "levels": 10
            },
            "full plating": {
                "mods": [
                    {"def": "armor added 20 perLevel", "type": "def"},
                ],
                "slot": "chest",
                "levels": 10
            },
            "hateful blade": {
                "mods": [
                    {"def": "physDmg gainedas -5 hpLeech", "type": "dmg"},
                    {"def": "physDmg more 5 perLevel", "type": "dmg"},
                ],
                "slot": "weapon",
                "levels": 10
            },
            "ethereal": {
                "mods": [
                    {"def": "dodge more 2 perLevel", "type": "def"},
                    {"def": "dodge added 100", "type": "def"},
                ],
                "slot": "hands",
                "levels": 10
            },
            "pyromania": {
                "mods": [
                    {"def": "fireDmg more 8", "type": "dmg"},
                    {"def": "fireDmg more 5 perLevel", "type": "dmg"},
                    {"def": "fireDmg gainedas 1 hpLeech", "type":"dmg"}
                ],
                "slot": "head",
                "levels": 10
            },
        },
        "monster": {
            "skeleton" : {
                "items": [["weapon", "melee", 0], ["armor", "head", 0], ["armor", "chest", 0], ["armor", "legs", 0]],
                "skills": ["basic melee"],
                "sourceCards": [
                    ["proto-skeleton", 0],
                    ["proto-grunt", 0],
                    ["sharpened", 1],
                    ["breadhat", 1],
                    ["stinging", 1]
                ],
            },
            "fire skeleton": {
                "items": [["weapon", "melee", 0], ["armor", "head", 0], ["armor", "chest", 0], ["armor", "legs", 0]],
                "skills": ["fire slash", "super smash", "basic melee"],
                "sourceCards": [
                    ["hot sword", 1],
                    ["proto-skeleton", 0],
                    ["six pack", 1],
                    ["compression shorts", 1],
                    ["asbestos lining", 1]
                ]
            },
            "skeleton archer" : {
                "items": [["weapon", "range", 0], ["armor", "chest", 0], ["armor", "hands", 0]],
                "skills": ["speed shot", "basic range"],
                "sourceCards": [
                    ["proto-skeleton", 0],
                    ["head of vigor", 1]
                ]
            },
            "skeleton mage" : {
                "items": [["weapon", "spell", 0], ["armor", "legs", 0], ["armor", "hands", 0]],
                "skills": ["fire ball", "basic spell"],
                "sourceCards": [
                    ["proto-skeleton", 0],
                    ["brain juice", 1],
                    ["heart juice", 1],
                ]
            },
            "skeleton king" : {
                "items": [["weapon", "melee", 1], ["armor", "head", 1], ["armor", "chest", 1], ["armor", "hands", 1], ["armor", "legs", 1]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["proto-skeleton", 1],
                    ["proto-boss", 1],
                    ["hot sword", 1]
                ]
            },
            "wood nymph" : {
                "items": [["weapon", "melee", 0], ["armor", "head", 0], ["armor", "chest", 0], ["armor", "legs", 0]],
                "skills": ["basic melee"],
                "sourceCards": [
                    ["nimble", 1],
                    ["compression shorts", 3]
                ]
            },
            "bat" : {
                "items": [["weapon", "melee", 0]],
                "skills": ["quick hit", "basic melee"],
                "sourceCards": [
                    ["nimble", 1],
                    ["bloodsucker", 1]
                ]
            },
            "ent" : {
                "items": [["weapon", "melee", 0]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["strong back", 2],
                    ["thwomping", 2]
                ]
            },
            "elf" : {
                "items": [["weapon", "range", 1]],
                "skills": ["poison arrow", "basic range"],
                "sourceCards": [
                    ["dexterous hands", 1],
                    ["proto-elf", 0]
                ]
            },
            "elf king" : {
                "items": [["weapon", "range", 2]],
                "skills": ["speed shot", "poison arrow", "basic range"],
                "sourceCards": [
                    ["proto-boss", 0],
                    ["proto-elf", 0],
                    ["dexterous hands", 2]
                ],
                "flavor": "He knows you've been naughty"
            },
            "dummy": {
                "items": [],
                "skills": [],
                "sourceCards": [
                    ["dummy", 0]
                ]
            },
            "fire golem" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["heart of granite", 0],
                    ["ignited", 1]
                ],
            },
            "ice golem" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["heart of granite", 0],
                    ["frosted", 1]
                ],
            },
            "shock golem" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["heart of granite", 0],
                    ["charged", 1]
                ],
            },
            "toxic golem" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["heart of granite", 0],
                    ["putrified", 1]
                ],
            },
            "gnome" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["quick hit", "basic melee"],
                "sourceCards": [
                    ["small stature", 1],
                    ["keen wit", 1]
                ],
            },
            "gnome electrician" : {
                "items": [["weapon", "spell", 2]],
                "skills": ["lightning ball", "nova", "basic melee"],
                "sourceCards": [
                    ["small stature", 1],
                    ["keen wit", 1],
                    ["electrified", 1],
                ],
            },
            "roflcopter" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["pressure wave", "quick hit", "basic melee"],
                "sourceCards": [
                    ["flying", 1],
                    ["nimble", 1],
                    ["proto-rofl", 1]
                ],
            },
            "harpy" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["pressure wave", "quick hit", "basic melee"],
                "sourceCards": [
                    ["flying", 1],
                    ["nimble", 1],
                    ["clawed", 1],
                ],
            },
            "mechcinerator" : {
                "items": [["weapon", "spell", 2]],
                "skills": ["incinerate", "fire nova", "basic melee"],
                "sourceCards": [
                    ["riveted", 1],
                    ["clockwork", 1],
                    ["mecha heart", 1],
                    ["ignited", 1],
                    ["steam powered", 1]
                ],
            },
            "mechfridgerator": {
                "items": [["weapon", "spell", 2]],
                "skills": ["ice blast", "ice nova", "basic melee"],
                "sourceCards": [
                    ["riveted", 1],
                    ["clockwork", 1],
                    ["mecha heart", 1],
                    ["frosted", 1],
                    ["steam powered", 1]
                ],
            },
            "mecha watt" : {
                "items": [["weapon", "spell", 2]],
                "skills": ["lightning ball", "nova", "basic melee"],
                "sourceCards": [
                    ["riveted", 1],
                    ["clockwork", 1],
                    ["mecha heart", 1],
                    ["charged", 1],
                    ["steam powered", 1]
                ],
            },
            "sir mechs-a-lot" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["flame cone", "lightning ball", "ice nova", "basic melee"],
                "sourceCards": [
                    ["proto-boss", 1],
                    ["riveted", 1],
                    ["clockwork", 1],
                    ["mecha heart", 1],
                    ["charged", 1],
                    ["steam powered", 1],
                    ["frosted", 1],
                    ["ignited", 1]
                ],
            },
            "goblin" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["flame cone", "basic melee"],
                "sourceCards": [
                    ["goblin toe", 1],
                    ["berserking", 1],
                    ["simple minded", 1],
                ],
            },
            "goblin priest" : {
                "items": [["weapon", "spell", 2]],
                "skills": ["fire ball", "incinerate", "basic spell"],
                "sourceCards": [
                    ["goblin toe", 1],
                    ["berserking", 1],
                    ["simple minded", 1],
                    ["pyromania", 1]
                ],
            },
            "goblin artillery" : {
                "items": [["weapon", "range", 2]],
                "skills": ["basic range"],
                "sourceCards": [
                    ["goblin toe", 1],
                    ["berserking", 1],
                    ["simple minded", 1],
                    ["explosive bolts", 1]
                ],
            },
            "flame dragon" : {
                "items": [["weapon", "spell", 2]],
                "skills": ["incinerate", "basic spell"],
                "sourceCards": [
                    ["ignited", 1],
                    ["proto-boss", 1],
                    ["pyromania", 1],
                    ["keen wit", 1],
                    ["brain juice", 1]
                ],
            },
            
            "zombie" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["poison slash", "basic melee"],
                "sourceCards": [
                    ["unwashed hands", 1],
                    ["shambling", 1],
                    ["simple minded", 1],
                ],
            },
            "angry imp" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["poison slash", "quick hit", "basic melee"],
                "sourceCards": [
                    ["berserking", 1],
                    ["small stature", 1],
                    ["simple minded", 1],
                    ["indigenous toxins", 1],
                ],
            },
            "dart imp" : {
                "items": [["weapon", "melee", 2]],
                "skills": ["poison arrow", "speed shot", "basic range"],
                "sourceCards": [
                    ["berserking", 1],
                    ["small stature", 1],
                    ["simple minded", 1],
                    ["indigenous toxins", 1],
                    ["putrified", 1]
                ],
            },
            "imp shaman": {
                "items": [["weapon", "spell", 2]],
                "skills": ["poison ball", "poison nova", "basic spell"],
                "sourceCards": [
                    ["berserking", 1],
                    ["small stature", 1],
                    ["simple minded", 1],
                    ["indigenous toxins", 1],
                ],
            },
            "marshwalker": {
                "items": [["weapon", "melee", 2]],
                "skills": ["poison slash", "poison nova", "basic melee"],
                "sourceCards": [
                    ["indigenous toxins", 1],
                    ["putrified", 1],
                    ["non-newtownian fluid", 1]
                ],
            },
            "mad ape": {
                "items": [["weapon", "melee", 2]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["big", 1],
                    ["berserking", 1],
                    ["buff", 1]
                ],
            },
            "scalp collector": {
                "items": [["weapon", "range", 2]],
                "skills": ["headshot", "basic range"],
                "sourceCards": [
                    ["indigenous toxins", 1],
                    ["putrified", 1],
                    ["precise", 1],
                    ["vest pockets", 1],
                ],
            },
            "frost skeleton": {
                "items": [["weapon", "melee", 0], ["armor", "head", 0], ["armor", "chest", 0], ["armor", "legs", 0]],
                "skills": ["ice slash", "basic melee"],
                "sourceCards": [
                    ["cold sword", 1],
                    ["proto-skeleton", 0],
                    ["six pack", 1],
                    ["compression shorts", 1],
                    ["fleece lining", 1]
                ]
            },
            "frost mage": {
                "items": [["weapon", "spell", 2]],
                "skills": ["ice blast", "ice nova", "ice ball", "basic range"],
                "sourceCards": [
                    ["fleece lining", 1],
                    ["frosted", 1],
                    ["keen wit", 1],
                    ["fur hat", 1],
                ],
            },
            "frozen warrior": {
                "items": [["weapon", "melee", 2]],
                "skills": ["ice slash", "basic melee"],
                "sourceCards": [
                    ["fleece lining", 1],
                    ["frosted", 1],
                    ["chinchilla lining", 1],
                    ["ice plating", 1],
                ],
            },
            "yeti": {
                "items": [["weapon", "melee", 2]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["fleece lining", 1],
                    ["frosted", 1],
                    ["chinchilla lining", 1],
                    ["clawed", 1],
                    ["yeti fur", 1]
                ],
            },
            "shadow knight": {
                "items": [["weapon", "melee", 2]],
                "skills": ["masterful strike", "basic melee", "shadow dagger"],
                "sourceCards": [
                    ["shadow walker", 1],
                    ["full plating", 1],
                    ["sharpened", 1],
                    ["hateful blade", 1],
                    ["ethereal", 1]
                ],
            },
            "ghoul": {
                "items": [["weapon", "melee", 2]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["shambling", 1],
                    ["simple minded", 1],
                    ["bloodsucker", 1],
                ],
            },
            "vampire": {
                "items": [["weapon", "melee", 2]],
                "skills": ["health suck", "super smash", "basic melee"],
                "sourceCards": [
                    ["vampyric touch", 1],
                    ["vampyric embrace", 1],
                    ["bloodsucker", 1],
                    ["soulsucker", 1],
                    ["shadow walker", 1],
                    ["flying", 1]
                ],
            },
            "living statue": {
                "items": [["weapon", "melee", 2]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["heart of granite", 1],
                    ["simple minded", 1],
                    ["alabaster", 1],
                ],
            },
            "gargoyle": {
                "items": [["weapon", "melee", 2]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["heart of granite", 1],
                    ["simple minded", 1],
                    ["alabaster", 1],
                    ["clawed", 1],
                    ["flying", 1]                    
                ],
            },
            "minotaur": {
                "items": [["weapon", "melee", 2]],
                "skills": ["super smash", "basic melee"],
                "sourceCards": [
                    ["simple minded", 1],
                    ["big", 1],
                    ["buff", 1]
                ],
            },
            "wraith": {
                "items": [["weapon", "melee", 2]],
                "skills": ["ice slash", "basic melee"],
                "sourceCards": [
                    ["berserking", 1],
                    ["flying", 1],
                    ["ethereal", 1],
                ],
            },

          
            
        },
        "zone": {
            "spooky dungeon": {
                "choices": ["skeleton", "skeleton archer", "skeleton mage", "fire skeleton"],
                "weights": [20, 10, 5, 5],
                "boss": "skeleton king",
                "roomCount": 20,
                "quantity": [1, 1, 3],
                "level": 1
            },
            "dark forest": {
                "choices": ["wood nymph", "bat", "elf", "ent", "dahd djinn"],
                "weights": [20, 15, 15, 5],
                "boss": "elf king",
                "roomCount": 20,
                "quantity": [2, 2, 3],
                "level": 4,
            },
            "clockwork ruins": {
                "choices": ["gnome", "gnome electrician", "roflcopter", "harpy", "mechcinerator", "mechfridgerator", "mecha watt", "ser djinn"],
                "weights": [20, 10, 10, 10, 5, 5, 5, 0],
                "boss": "sir mechs-a-lot",
                "roomCount": 20,
                "quantity": [2,2,3],
                "level": 7,
            },
            "aggro crag": {
                "choices": ["goblin", "goblin priest", "goblin artillery", "fire skeleton", "fire golem", "kei djinn"],
                "weights": [20, 10, 10, 10, 10, 0],
                "boss":"flame dragon",
                "roomCount": 20,
                "quantity": [2,2,3],
                "level": 10,
            },
            "hostile marsh": {
                "choices": ["zombie", "angry imp", "dart imp", "imp shaman", "marshwalker", "mad ape", "al-err djinn", "scalp collector", "toxic golem"],
                "weights": [20, 10, 10, 10, 10, 10, 0, 10 ,10],
                "boss":"scalp collector",
                "roomCount": 20,
                "quantity": [2,2,3],
                "level": 13,
            },
            "icy tunnel": {
                "choices": ["frost skeleton", "ice golem", "frost mage", "frozen warrior", "yeti", "frow djinn"],
                "weights": [20, 10, 10, 10 ,10, 0],
                "boss": "yeti",
                "roomCount": 20,
                "quantity": [2,2,3],
                "level": 16,
            },
            "gothic castle": {
                "choices": ["shadow knight", "ghoul", "vampire", "living statue", "gargoyle", "minotaur", "wraith"],
                "weights": [20, 10, 10, 10, 10, 10, 10],
                "boss": "shadow knight",
                "roomCount": 20,
                "quantity": [2,2,3],
                "level": 19,
            },
            "demonic laboroatory": {
                "choices": ["stitchling", "mad scientist", "minotaur", "blood golem"],
                "weights": [20, 10, 10],
                "boss": "pigbearman",
                "roomCount": 20,
                "quantity": [2,2,3],
                "level": 17,
            },
            "scarred plains": {
                "choices": ["troll", "cyclops", "harpy", "bandit", "giant", "frost giant"],
                "weights": [20, 10, 10],
                "boss": "pigbearman",
                "roomCount": 20,
                "quantity": [2,2,3],
                "level": 17,
            },
            "dojo": {
                "choices": ["dummy"],
                "weights": [1],
                "boss": "dummy",
                "roomCount": 10,
                "quantity": [1, 0, 0],
                "level": 1,
            },
            "empty dojo": {
                "choices": [],
                "weights": [],
                "boss": "dummy",
                "roomCount": 10,
                "quantity": [0, 0, 0],
                "level": 1,
            },
        },
        "zoneProgression": ["spooky dungeon", "dark forest"],
        "test": {
            "hngg": {"a": 10},
            "fwah": {"b": 10},
            "buh": {"a": 12},
            "hi": {
                "prototype": ["hngg", "fwah"],
                "b": 12
            },
            "foo": {
                "prototype": ["hngg", "buh"],
                "a": 15
            },
            "harf": {
                "prototype": ["hi", "foo"],
                "c": 10
            }
        },
        // it goes: [hngg, fwah, hi, hngg, buh, foo, harf]: c: 10, b: 12, a: 15
        "statnames": {
            "strength": "Strength",
            "dexterity": "Dexterity",
            "wisdom": "Wisdom",
            "vitality": "Vitality",
            "maxHp": "Maximum Health",
            "maxMana": "Maximum Mana",
            "armor": "Armor",
            "dodge": "Dodge",
            "eleResistAll": "Elemental Damage Taken",
            "hpRegen": "Health Regenerated per Second",
            "manaRegen": "Mana Regenerated per Second",
            "moveSpeed": "Movement Speed",
            "fireResist": "Fire Damage Taken",
            "coldResist": "Cold Damage Taken",
            "lightResist": "Lightning Damage Taken",
            "poisResist": "Poison Damage Taken",
            "meleeDmg": "Melee Damage",
            "rangeDmg": "Ranged Damage",
            "spellDmg": "Spell Damage",
            "physDmg": "Physical Damage",
            "fireDmg": "Fire Damage",
            "coldDmg": "Cold Damage",
            "lightDmg": "Lightning Damage",
            "poisDmg": "Poison Damange",
            "hpOnHit": "Health Gained on Hit",
            "manaOnHit": "Mana Gained on Hit",
            "cooldownTime": "Cooldown Length",
            "range": "Skill Range",
            "speed": "Skill Speed",
            "manaCost": "Mana Cost",
            "hpLeech": "Leeched Health",
            "manaLeech": "Leeched Mana"
        }

    };

    /*
      fuck: a = 1
      fwah: a = 3
      shit: a = 2

      asdf: [fuck(2), shit(3)]

      fdsa: [fwah(5)]

      buh: [asdf(1), fdsa(4)]

      [asdf, fuck, shit, fdsa, fwah]
    */

    function recExtend(name, r, names) {
        if ('prototype' in r[name] && r[name]['prototype'].length > 0) {
            for (var i = 0; i < r[name]['prototype'].length; i++) {
                names = recExtend(r[name]['prototype'][i], r, names);
            }
        }
        names[names.length] = name;
        // log.debug("recExtend, name %s, names now %s", name, JSON.stringify(names));
        return names;
    }

    function expand(type, name) {
        if (!(type in ref) || !(name in ref[type])) {
            log.error('Could not find reference for a %s named %s', type, name);
            throw('fuck');
            return;
        }

        var names = recExtend(name, ref[type], []);
        var item = $.extend(true, {}, ref[type][name]);
        for (var i = 0; i < names.length; i++) {
            item = $.extend(true, item, ref[type][names[i]]);
        }
        if ('itemType' in item) {
            throw(sprintf('Found a "itemType" key in item %s. No item is allowed to have "itemType" as it it set in expand', JSON.stringify(item)))
        }
        item['itemType'] = type;
        if ('name' in item) {
            throw(sprintf('Found a "name" key in item %s. No item is allowed to have "name" as it it set in expand', JSON.stringify(item)))
        }
        item['name'] = name;

        log.debug("itemref.expand(%s, %s), Final item: %s", type, name, JSON.stringify(item));

        return item;
    }

    exports.extend({
        'ref': ref,
        'expand': expand
    });

});
