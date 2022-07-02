import { jankyPatchApplyDamage } from "./scripts/actor/applyDamage.js";
import { jankyPatchRollAbilitySave } from "./scripts/actor/rollAbilitySave.js";
import { jankyPatchRollAbilityTest } from "./scripts/actor/rollAbilityTest.js";
import { jankyPatchRollDeathSave } from "./scripts/actor/rollDeathSave.js";
import { jankyPatchRollHitDie } from "./scripts/actor/rollHitDie.js";
import { jankyPatchRollSkill } from "./scripts/actor/rollSkill.js";
import { jankyPatchRollDamage } from "./scripts/item/damageRoll.js";
import { jankyPatchDisplayCard } from "./scripts/item/displayCard.js";
import { jankyPatchRoll } from "./scripts/item/roll.js";
import { jankyPatchRollAttack } from "./scripts/item/rollAttack.js";
import { jankyPatchRollFormula } from "./scripts/item/rollFormula.js";
import { jankyPatchRollRecharge } from "./scripts/item/rollRecharge.js";
import { jankyPatchRollToolCheck } from "./scripts/item/rollToolCheck.js";

  // actor hooks
jankyPatchRollAbilityTest();
jankyPatchRollAbilitySave();
jankyPatchRollDeathSave();
jankyPatchRollSkill();
jankyPatchApplyDamage();
jankyPatchRollHitDie();

  // item hooks
jankyPatchRollAttack();
jankyPatchRollDamage();
jankyPatchRollFormula();
jankyPatchRollRecharge();
jankyPatchRollToolCheck();
jankyPatchDisplayCard();

jankyPatchRoll();