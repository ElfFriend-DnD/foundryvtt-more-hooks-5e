import Actor5e from '../../../../systems/dnd5e/module/actor/entity.js'
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";

const preRollAbilitySavePatch = `
if (this instanceof CONFIG.Actor.documentClass && !!rollData && !!abilityId) {
  const allowed = Hooks.call('Actor5e.preRollAbilitySave', this, rollData, abilityId);
  if ( allowed === false ) return;
}

const result = await game.dnd5e.dice.d20Roll(rollData);

if (this instanceof CONFIG.Actor.documentClass && !!rollData && !!abilityId && !!result) {
  Hooks.callAll('Actor5e.rollAbilitySave', this, result, abilityId);
}

return result;
`;

export function jankyPatchRollAbilitySave() {
  try {
    const newFnString = jankyPatch(Actor5e.prototype.rollAbilitySave.toString(), {
      firstLineString: "rollAbilitySave(abilityId, options={}) {\n",
      regex: /(return d20Roll\(rollData\);)/,
      patch: preRollAbilitySavePatch,
    });
  
    Actor5e.prototype.rollAbilitySave =  new AsyncFunction("abilityId", "options={}", newFnString);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "rollAbilitySave":`, err, 'Original Function was not replaced.');
  }
}


/**
 * A hook event that fires before an Actor rolls a Ability Save. This will fire before the configuration dialog appears.
 * 
 * @param {Actor5e} actor       The Actor that rolled the ability save
 * @param {object} rollData           The rolldata being provided to the D20Roll instance
 * @param {string} abilityId      The ability id (e.g. "str")
 */
 export async function preRollAbilitySave() { }

/**
 * A hook event that fires after an Actor rolls a Ability Save
 * @param {Actor5e} actor       The Actor that rolled the ability save
 * @param {D20Roll} result           The Result of the ability save
 * @param {string} abilityId      The ability id (e.g. "str")
 */
export async function rollAbilitySave() { }
