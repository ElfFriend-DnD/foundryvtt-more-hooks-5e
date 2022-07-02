import Actor5e from '../../../../systems/dnd5e/module/actor/entity.js'
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";


const preApplyDamagePatch = `
if (this instanceof CONFIG.Actor.documentClass && amount !== undefined && updates !== undefined) {
  const canApplyDamage = Hooks.call('Actor5e.preApplyDamage', this, amount, updates);
  if ( canApplyDamage === false ) return this;
}

if (!allowed) {
  return this;
}

const actorUpdate = await this.update(updates, {dhp: -amount});

if (this instanceof CONFIG.Actor.documentClass && amount !== undefined) {
  Hooks.callAll('Actor5e.applyDamage', this, -amount);
}

return actorUpdate;
`;

export function jankyPatchApplyDamage() {
  try {
    const newFnString = jankyPatch(Actor5e.prototype.applyDamage.toString(), {
      firstLineString: "async applyDamage(amount=0, multiplier=1) {\n",
      regex: /(return allowed !== false \? this.update\(updates, \{dhp: -amount\}\) : this;)/,
      patch: preApplyDamagePatch,
    });
  
    Actor5e.prototype.applyDamage =  new AsyncFunction("amount=0", "multiplier=1", newFnString);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "applyDamage":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Actor takes damage. Note this only fires when the `applyDamage` method is called, not when the actor's HP is updated manually.
 * @param {Actor5e} actor       The Actor that took the damage
 * @param {number} amount           The total amount of damage the actor took. Informational, does not drive update.
 * @param {object} updates           The updates about to be made to the actor's hp. This should be mutated to affect the outcome of the damage application.
 */
 function preApplyDamage() { }

/**
 * A hook event that fires after an Actor takes damage. Note this only fires when the `applyDamage` method is called, not when the actor's HP is updated manually.
 * @param {Actor5e} actor       The Actor after taking damage
 * @param {number} totalDamageTaken           The total amount of damage the actor took
 */
function applyDamage() { }
