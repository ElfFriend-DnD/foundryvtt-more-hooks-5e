import { MODULE_NAME } from "../const.js";

export function patchApplyDamage() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Actor.documentClass.prototype.applyDamage', applyDamagePatch, "WRAPPER");
}

async function applyDamagePatch(wrapper, amount, multiplier, ...rest) {
  // this is mutated after wrapper is done
  const prevHp = this.data.data.attributes?.hp;

  const result = await wrapper(amount, multiplier, ...rest);

  // abort if the wrapper didn't apply damage
  if (!result) return result;

  const totalDamageTaken = Math.floor(parseInt(amount ?? 0) * (multiplier ?? 1)) * -1;

  const newHp = this.data.data.attributes?.hp;

  const actor = this;

  Hooks.callAll('Actor5e.applyDamage', actor, totalDamageTaken, prevHp, newHp);

  return result;
}

/**
 * A hook event that fires after an Actor rolls a Skill Check
 * @param {Actor5e} actor       The Actor that took the damage
 * @param {number} totalDamageTaken           The total amount of damage the actor took
 * @param {object} prevHp           The hp attribute of the Actor before taking damage
 * @param {object} newHp           The hp attribute of the Actor after taking damage
 * 
 */
function applyDamage() { }
