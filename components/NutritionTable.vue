<template>
  <div class="nutrition-table d-flex flex-column justify-center align-center">
    <ul style="list-style: none" class="py-4 pt-12 px-2">
      <li v-if="description && description.zh" class="d-flex align-start my-2">
        <v-icon class="mt-1 mr-1" small color="green darken-2">{{ icons.mdiShieldCheck }}</v-icon>
        <div>
          {{ description[$i18n.locale] }}
        </div>
      </li>
      <li v-if="edibleMethods" class="d-flex align-start my-2">
        <v-icon class="mt-1 mr-1" small color="amber darken-2">{{ icons.mdiSilverwareForkKnife }}</v-icon>
        <div>
          {{ $t('howToEat') }}：{{ $i18n.locale === 'en' ? edibleMethodsEn : edibleMethods }}
        </div>
      </li>
    </ul>
    <table v-if="nutritionInfo">
      <tbody>
      <tr>
        <th colspan="2">
          <h5 class="nutrition-head">{{ $t('nutritionFacts') }} ({{ nutritionInfo.servingText ? nutritionInfo.servingText[$i18n.locale] : $t('perServingSize100g') }})</h5>
        </th>
      </tr>
      <tr>
        <td>{{ $t('calories') }}</td>
        <td>{{ nutritionInfo.calories.toString() || '--' }}kcal</td>
      </tr>
      <tr>
        <td>{{ $t('protein') }}</td>
        <td>{{ nutritionInfo.protein.toString() || '--' }}g</td>
      </tr>
      <tr>
        <td>{{ $t('totalFat') }}</td>
        <td>{{ nutritionInfo.fat.total.toString() || '--' }}g</td>
      </tr>
      <tr class="no-border">
        <td><span style="margin-left: 15px;">-{{ $t('saturatedFat') }}</span></td>
        <td>{{ nutritionInfo.fat.saturatedFat.toString() || '--' }}g</td>
      </tr>
      <tr class="no-border">
        <td><span style="margin-left: 15px;">-{{ $t('transFat') }}</span></td>
        <td>{{ nutritionInfo.fat.transFat.toString() || '--' }}g</td>
      </tr>
      <tr>
        <td>{{ $t('totalCarbohydrates') }}</td>
        <td>{{ nutritionInfo.carbohydrate.total.toString() || '--' }}g</td>
      </tr>
      <tr class="no-border">
        <td><span style="margin-left: 15px;">-{{ $t('sugar') }}</span></td>
        <td>{{ nutritionInfo.carbohydrate.sugars.toString() || '--' }}g</td>
      </tr>
      <tr>
        <td>{{ $t('sodium') }}</td>
        <td>{{ nutritionInfo.sodium.toString() || '--' }}mg</td>
      </tr>
      </tbody>
    </table>
    <div class="ingredients" v-if="ingredients">
      {{ $t('ingredients') }}: {{ ingredients[$i18n.locale] }}<br>
    </div>
  </div>
</template>

<script>
import {mdiShieldCheck, mdiSilverwareForkKnife, mdiStar} from "@mdi/js";

export default {
  name  : "NutritionTable",
  props : ['ingredients', 'nutritionInfo', 'description', 'edibleMethods', 'edibleMethodsEn'],
  data  : () => ({
      icons : {
        mdiStar,
        mdiShieldCheck,
        mdiSilverwareForkKnife
      }
    }
  )
}
</script>

<style scoped lang="scss">
.nutrition-table {
  background-color: rgba(238, 238, 238, 0.29);

  table {
    border-collapse: collapse;
    border: 1px solid #ccc;
    margin-top: 30px;
    width: 70%;

    .nutrition-head {
      border-bottom: 2px solid black;
    }

    td {
      padding: 2px 4px;
    }

    tr:nth-child(even) {
      td {
        border-bottom: 1px solid #ccc;
      }
    }
  }

  @media (max-width: 960px) {
    font-size: 14px;
    table {
      width: 95%;

      .nutrition-head {
        border-bottom: 2px solid black;
      }

      td {
        padding: 2px 4px;
      }

      tr:nth-child(even) {
        td {
          border-bottom: 1px solid #ccc;
        }
      }
    }

  }
}
</style>
