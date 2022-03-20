import Actor5e from '../../../../systems/dnd5e/module/actor/entity.js'
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";


const preRollDeathSavePatch = `
if (this instanceof CONFIG.Actor.documentClass && !!rollData) {
  const allowed = Hooks.call('Actor5e.preRollDeathSave', this, rollData);
  if ( allowed === false ) return;
}

const roll = await game.dnd5e.dice.d20Roll(rollData);
`;

const postRollDeathSavePatch = `
if (this instanceof CONFIG.Actor.documentClass && success !== undefined && !!roll) {
  Hooks.callAll('Actor5e.rollDeathSave', this, roll, success);
}
return roll;
`

export function jankyPatchRollDeathSave() {
  try {
    const withPreHook = jankyPatch(Actor5e.prototype.rollDeathSave.toString(), {
      firstLineString: "async rollDeathSave(options={}) {\n",
      regex: /const roll = await d20Roll\(rollData\);/,
      patch: preRollDeathSavePatch,
    });
  
    const withPreHookFn = new AsyncFunction("options={}", withPreHook);

    const withPreAndPostHook = jankyPatch(withPreHookFn.toString(), {
      firstLineString: ") {\n",
      regex: /return roll;/,
      patch: postRollDeathSavePatch,
    });

    Actor5e.prototype.rollDeathSave =  new AsyncFunction("options={}", withPreAndPostHook);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "rollDeathSave":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Actor rolls a Death Save
 * @param {Actor5e} actor       The Actor that rolled the death save
 * @param {object} rollData      Roll config which will be provided to the d20Roll function
 */
 export async function preRollDeathSave() { }

/**
 * A hook event that fires after an Actor's Death Save has been evaluated
 * @param {Actor5e} actor       The Actor that rolled the death save
 * @param {D20Roll} result           The Result of the death save
 * @param {boolean} success      Whether or not the death save was successful
 */
export async function rollDeathSave() { }
