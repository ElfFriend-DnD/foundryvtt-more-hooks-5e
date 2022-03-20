import Item5e from '../../../../systems/dnd5e/module/item/entity.js';
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";

const preRollDamagePatch = `
const finalRollConfig = foundry.utils.mergeObject(rollConfig, options);

if (this instanceof CONFIG.Item.documentClass && !!finalRollConfig) {
  const allowed = Hooks.call('Item5e.preRollDamage', this, finalRollConfig);
  if ( allowed === false ) return null;
}

const roll = await game.dnd5e.dice.damageRoll(finalRollConfig);

if (this instanceof CONFIG.Item.documentClass && roll !== undefined) {
  Hooks.callAll('Item5e.rollDamage', this, roll);
}

return roll;
`;

export function jankyPatchRollDamage() {
  try {
    const newFnString = jankyPatch(Item5e.prototype.rollDamage.toString(), {
      firstLineString: "rollDamage({critical=false, event=null, spellLevel=null, versatile=false, options={}}={}) {\n",
      regex: /return damageRoll\(foundry.utils.mergeObject\(rollConfig, options\)\);/,
      patch: preRollDamagePatch,
    });
  
    Item5e.prototype.rollDamage =  new AsyncFunction("{critical=false, event=null, spellLevel=null, versatile=false, options={}}={}", newFnString);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "rollDamage":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Item rolls a Damage Roll. This happens before the Roll Config dialog appears.
 * @param {Item5e} item       The Item that rolls the Damage Roll
 * @param {object} rollConfig           Roll config which will be provided to the damageRoll function
 */
 function preRollDamage() { }

/**
 * A hook event that fires after an Item rolls a Damage Roll
 * @param {Item5e} item       The Item that rolls the Damage Roll
 * @param {DamageRoll} result           The Result of the Damage Roll
 */
function rollDamage() {}
