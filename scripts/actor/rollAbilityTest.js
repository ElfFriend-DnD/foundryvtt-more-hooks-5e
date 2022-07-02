import Actor5e from '../../../../systems/dnd5e/module/actor/entity.js'
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";

const preRollAbilityTestPatch = `
if (this instanceof CONFIG.Actor.documentClass && !!rollData && !!abilityId) {
  const allowed = Hooks.call('Actor5e.preRollAbilityTest', this, rollData, abilityId);
  if ( allowed === false ) return;
}

const result = await game.dnd5e.dice.d20Roll(rollData);

if (this instanceof CONFIG.Actor.documentClass && !!rollData && !!abilityId && !!result) {
  Hooks.callAll('Actor5e.rollAbilityTest', this, result, abilityId);
}

return result;
`;

export function jankyPatchRollAbilityTest() {
  try {
    const newFnString = jankyPatch(Actor5e.prototype.rollAbilityTest.toString(), {
      firstLineString: "rollAbilityTest(abilityId, options={}) {\n",
      regex: /(return d20Roll\(rollData\);)/,
      patch: preRollAbilityTestPatch,
    });

    Actor5e.prototype.rollAbilityTest = new AsyncFunction("abilityId", "options={}", newFnString);
  } catch (err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "rollAbilityTest":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Actor rolls a Ability Test. This will fire before the configuration dialog appears.
 * 
 * @param {Actor5e} actor       The Actor that rolled the ability test
 * @param {object} rollData           The rolldata being provided to the D20Roll instance
 * @param {string} abilityId      The ability id (e.g. "str")
 */
export async function preRollAbilityTest() { }

/**
 * A hook event that fires after an Actor rolls a Ability Test
 * @param {Actor5e} actor       The Actor that rolled the ability test
 * @param {D20Roll} result           The Result of the ability test
 * @param {string} abilityId      The ability id (e.g. "str")
 */
export async function rollAbilityTest() { }
