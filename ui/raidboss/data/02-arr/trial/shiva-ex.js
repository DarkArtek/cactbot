import Conditions from '../../../../../resources/conditions';
import NetRegexes from '../../../../../resources/netregexes';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';

// TODO: some sort of warning about extra tank damage during bow phase?
// TODO: should the post-staff "spread" happen unconditionally prior to marker?

export default {
  zoneId: ZoneId.TheAkhAfahAmphitheatreExtreme,
  timelineFile: 'shiva-ex.txt',
  timelineTriggers: [
    {
      id: 'ShivaEx Absolute Zero',
      regex: /Absolute Zero/,
      beforeSeconds: 5,
      condition: Conditions.caresAboutAOE(),
      // These are usually doubled, so avoid spamming.
      suppressSeconds: 10,
      response: Responses.aoe(),
    },
    {
      id: 'ShivaEx Icebrand',
      regex: /Icebrand/,
      beforeSeconds: 5,
      suppressSeconds: 1,
      alertText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Party Share Tankbuster',
          de: 'Tankbuster mit der Gruppe Teilen',
          fr: 'Partagez le Tank buster avec le groupe',
          ja: '頭割りタンクバスター',
          cn: '团队分摊死刑',
          ko: '파티 쉐어 탱버',
        },
      },
    },
    {
      // Heavenly Strike is knockback only when unshielded, so use "info" here.
      id: 'ShivaEx Heavenly Strike',
      regex: /Heavenly Strike/,
      beforeSeconds: 5,
      suppressSeconds: 1,
      response: Responses.knockback('info'),
    },
  ],
  triggers: [
    {
      id: 'ShivaEx Staff Phase',
      netRegex: NetRegexes.ability({ source: 'Shiva', id: '995', capture: false }),
      netRegexDe: NetRegexes.ability({ source: 'Shiva', id: '995', capture: false }),
      netRegexFr: NetRegexes.ability({ source: 'Shiva', id: '995', capture: false }),
      netRegexJa: NetRegexes.ability({ source: 'シヴァ', id: '995', capture: false }),
      netRegexKo: NetRegexes.ability({ source: '시바', id: '995', capture: false }),
      netRegexCn: NetRegexes.ability({ source: '希瓦', id: '995', capture: false }),
      response: (data, _matches, output) => {
        // cactbot-builtin-response
        output.responseOutputStrings = {
          staffTankSwap: {
            en: 'Staff (Tank Swap)',
            de: 'Stab (Tankwechsel)',
            fr: 'Bâton (Tank Swap)',
            ja: '杖 (スイッチ)',
            cn: '权杖（换T）',
            ko: '지팡이 (탱커 교대)',
          },
          staff: {
            en: 'Staff',
            de: 'Stab',
            fr: 'Bâton',
            ja: '杖',
            cn: '权杖',
            ko: '지팡이',
          },
        };

        if (data.role === 'tank') {
          if (data.currentTank && data.blunt && data.blunt[data.currentTank])
            return { alertText: output.staffTankSwap() };
        }

        return { infoText: output.staff() };
      },
      run: (data) => data.soonAfterWeaponChange = true,
    },
    {
      id: 'ShivaEx Sword Phase',
      netRegex: NetRegexes.ability({ source: 'Shiva', id: '993', capture: false }),
      netRegexDe: NetRegexes.ability({ source: 'Shiva', id: '993', capture: false }),
      netRegexFr: NetRegexes.ability({ source: 'Shiva', id: '993', capture: false }),
      netRegexJa: NetRegexes.ability({ source: 'シヴァ', id: '993', capture: false }),
      netRegexKo: NetRegexes.ability({ source: '시바', id: '993', capture: false }),
      netRegexCn: NetRegexes.ability({ source: '希瓦', id: '993', capture: false }),
      response: (data, _matches, output) => {
        // cactbot-builtin-response
        output.responseOutputStrings = {
          swordTankSwap: {
            en: 'Sword (Tank Swap)',
            de: 'Schwert (Tankwechsel)',
            fr: 'Épée (Tank Swap)',
            ja: '剣 (スイッチ)',
            cn: '剑（换T）',
            ko: '검 (탱커 교대)',
          },
          sword: {
            en: 'Sword',
            de: 'Schwert',
            fr: 'Épée',
            ja: '剣',
            cn: '剑',
            ko: '검',
          },
        };
        if (data.role === 'tank') {
          if (data.currentTank && data.slashing && data.slashing[data.currentTank])
            return { alertText: output.swordTankSwap() };
        }

        return { infoText: output.sword() };
      },
      run: (data) => data.soonAfterWeaponChange = true,
    },
    {
      id: 'ShivaEx Weapon Change Delayed',
      netRegex: NetRegexes.ability({ source: 'Shiva', id: ['993', '995'], capture: false }),
      netRegexDe: NetRegexes.ability({ source: 'Shiva', id: ['993', '995'], capture: false }),
      netRegexFr: NetRegexes.ability({ source: 'Shiva', id: ['993', '995'], capture: false }),
      netRegexJa: NetRegexes.ability({ source: 'シヴァ', id: ['993', '995'], capture: false }),
      netRegexKo: NetRegexes.ability({ source: '시바', id: ['993', '995'], capture: false }),
      netRegexCn: NetRegexes.ability({ source: '希瓦', id: ['993', '995'], capture: false }),
      delaySeconds: 30,
      run: (data) => data.soonAfterWeaponChange = false,
    },
    {
      id: 'ShivaEx Slashing Resistance Down Gain',
      netRegex: NetRegexes.gainsEffect({ effectId: '23C' }),
      run: (data, matches) => {
        data.slashing = data.slashing || {};
        data.slashing[matches.target] = true;
      },
    },
    {
      id: 'ShivaEx Slashing Resistance Down Lose',
      netRegex: NetRegexes.losesEffect({ effectId: '23C' }),
      run: (data, matches) => {
        data.slashing = data.slashing || {};
        data.slashing[matches.target] = false;
      },
    },
    {
      id: 'ShivaEx Blunt Resistance Down Gain',
      netRegex: NetRegexes.gainsEffect({ effectId: '23D' }),
      run: (data, matches) => {
        data.blunt = data.blunt || {};
        data.blunt[matches.target] = true;
      },
    },
    {
      id: 'ShivaEx Blunt Resistance Down Lose',
      netRegex: NetRegexes.losesEffect({ effectId: '23D' }),
      run: (data, matches) => {
        data.blunt = data.blunt || {};
        data.blunt[matches.target] = false;
      },
    },
    {
      id: 'ShivaEx Current Tank',
      netRegex: NetRegexes.ability({ source: 'Shiva', id: 'BE5' }),
      netRegexDe: NetRegexes.ability({ source: 'Shiva', id: 'BE5' }),
      netRegexFr: NetRegexes.ability({ source: 'Shiva', id: 'BE5' }),
      netRegexJa: NetRegexes.ability({ source: 'シヴァ', id: 'BE5' }),
      netRegexKo: NetRegexes.ability({ source: '시바', id: 'BE5' }),
      netRegexCn: NetRegexes.ability({ source: '希瓦', id: 'BE5' }),
      run: (data, matches) => data.currentTank = matches.target,
    },
    {
      id: 'ShivaEx Hailstorm Marker',
      netRegex: NetRegexes.headMarker({ id: '001D' }),
      condition: Conditions.targetIsYou(),
      response: Responses.spread('alert'),
    },
    {
      id: 'ShivaEx Glacier Bash',
      netRegex: NetRegexes.startsUsing({ id: 'BE9', capture: false }),
      response: Responses.getBehind('info'),
    },
    {
      id: 'ShivaEx Whiteout',
      netRegex: NetRegexes.startsUsing({ id: 'BEC', capture: false }),
      response: Responses.getIn(),
    },
    {
      id: 'ShivaEx Diamond Dust',
      netRegex: NetRegexes.ability({ source: 'Shiva', id: '98A', capture: false }),
      netRegexDe: NetRegexes.ability({ source: 'Shiva', id: '98A', capture: false }),
      netRegexFr: NetRegexes.ability({ source: 'Shiva', id: '98A', capture: false }),
      netRegexJa: NetRegexes.ability({ source: 'シヴァ', id: '98A', capture: false }),
      netRegexKo: NetRegexes.ability({ source: '시바', id: '98A', capture: false }),
      netRegexCn: NetRegexes.ability({ source: '希瓦', id: '98A', capture: false }),
      run: (data) => data.seenDiamondDust = true,
    },
    {
      id: 'ShivaEx Frost Bow',
      netRegex: NetRegexes.ability({ source: 'Shiva', id: 'BDD', capture: false }),
      netRegexDe: NetRegexes.ability({ source: 'Shiva', id: 'BDD', capture: false }),
      netRegexFr: NetRegexes.ability({ source: 'Shiva', id: 'BDD', capture: false }),
      netRegexJa: NetRegexes.ability({ source: 'シヴァ', id: 'BDD', capture: false }),
      netRegexKo: NetRegexes.ability({ source: '시바', id: 'BDD', capture: false }),
      netRegexCn: NetRegexes.ability({ source: '希瓦', id: 'BDD', capture: false }),
      response: Responses.getBehind('alarm'),
      run: (data) => {
        // Just in case ACT has crashed or something, make sure this state is correct.
        data.seenDiamondDust = true;
      },
    },
    {
      id: 'ShivaEx Avalanche Marker Me',
      netRegex: NetRegexes.headMarker({ id: '001A' }),
      condition: Conditions.targetIsYou(),
      // Responses.knockback does not quite give the 'laser cleave' aspect here.
      alarmText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Knockback Laser on YOU',
          de: 'Rückstoß-Laser auf DIR',
          fr: 'Poussée-Laser sur VOUS',
          ja: '自分にアバランチ',
          cn: '击退激光点名',
          ko: '넉백 레이저 대상자',
        },
      },
    },
    {
      id: 'ShivaEx Avalanche Marker Other',
      netRegex: NetRegexes.headMarker({ id: '001A' }),
      condition: Conditions.targetIsNotYou(),
      infoText: (_data, _matches, output) => output.text(),
      outputStrings: {
        text: {
          en: 'Avoid Laser',
          de: 'Laser ausweichen',
          fr: 'Évitez le laser',
          ja: 'アバランチを避ける',
          cn: '躲避击退激光',
          ko: '레이저 피하기',
        },
      },
    },
    {
      id: 'ShivaEx Shiva Circles',
      netRegex: NetRegexes.abilityFull({ source: 'Shiva', id: 'BEB' }),
      netRegexDe: NetRegexes.abilityFull({ source: 'Shiva', id: 'BEB' }),
      netRegexFr: NetRegexes.abilityFull({ source: 'Shiva', id: 'BEB' }),
      netRegexJa: NetRegexes.abilityFull({ source: 'シヴァ', id: 'BEB' }),
      netRegexKo: NetRegexes.abilityFull({ source: '시바', id: 'BEB' }),
      netRegexCn: NetRegexes.abilityFull({ source: '希瓦', id: 'BEB' }),
      condition: (data, matches) => {
        // Ignore other middle circles and try to only target the Icicle Impact x9.
        if (!data.seenDiamondDust || data.soonAfterWeaponChange)
          return false;

        const x = parseFloat(matches.x);
        const y = parseFloat(matches.y);
        return Math.abs(x) < 0.1 && Math.abs(y) < 0.1;
      },
      // This can hit multiple people.
      suppressSeconds: 10,
      response: Responses.goMiddle('info'),
    },
    {
      id: 'ShivaEx Permafrost',
      netRegex: NetRegexes.startsUsing({ id: 'BE3', capture: false }),
      response: Responses.stopMoving('alert'),
    },
    {
      id: 'ShivaEx Ice Boulder',
      netRegex: NetRegexes.ability({ id: 'C8A' }),
      condition: Conditions.targetIsNotYou(),
      infoText: (data, matches, output) => output.text({ player: data.ShortName(matches.target) }),
      outputStrings: {
        text: {
          en: 'Free ${player}',
          de: 'Befreie ${player}',
          fr: 'Libérez ${player}',
          ja: '${player}を救って',
          cn: '解救${player}',
          ko: '${player}감옥 해제',
        },
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Ice Soldier': 'Eissoldat',
        'Shiva': 'Shiva',
      },
      'replaceText': {
        '\\(circle\\)': '(Kreis)',
        '\\(cross\\)': '(Kreuz)',
        'Absolute Zero': 'Absoluter Nullpunkt',
        'Avalanche': 'Lawine',
        'Diamond Dust': 'Diamantenstaub',
        'Dreams Of Ice': 'Eisige Träume',
        'Frost Blade': 'Frostklinge',
        'Frost Bow': 'Frostbogen',
        'Frost Staff': 'Froststab',
        'Glacier Bash': 'Gletscherlauf',
        'Glass Dance': 'Gläserner Tanz',
        'Hailstorm': 'Hagelsturm',
        'Heavenly Strike': 'Himmelszorn',
        'Icebrand': 'Eisbrand',
        'Icicle Impact': 'Eiszapfen-Schlag',
        'Melt': 'Schmelzen',
        'Permafrost': 'Permafrost',
        'Whiteout': 'Schneeblindheit',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Ice Soldier': 'soldat de glace',
        'Shiva': 'Shiva',
      },
      'replaceText': {
        '\\?': ' ?',
        '\\(circle\\)': '(cercle)',
        '\\(cross\\)': '(croix)',
        'Absolute Zero': 'Zéro absolu',
        'Avalanche': 'Avalanche',
        'Diamond Dust': 'Poussière de diamant',
        'Dreams Of Ice': 'Illusions glacées',
        'Frost Blade': 'Lame glaciale',
        'Frost Bow': 'Arc glacial',
        'Frost Staff': 'Bâton glacial',
        'Glacier Bash': 'Effondrement de glacier',
        'Glass Dance': 'Danse de glace',
        'Hailstorm': 'Averse de grêle',
        'Heavenly Strike': 'Frappe céleste',
        'Icebrand': 'Épée de glace',
        'Icicle Impact': 'Impact de stalactite',
        'Melt': 'Fonte',
        'Permafrost': 'Permafrost',
        'Whiteout': 'Fusion Glaciation',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Ice Soldier': 'アイスソルジャー',
        'Shiva': 'シヴァ',
      },
      'replaceText': {
        '\\?': ' ?',
        '\\(circle\\)': '(輪)',
        '\\(cross\\)': '(十字)',
        'Absolute Zero': '絶対零度',
        'Avalanche': 'アバランチ',
        'Diamond Dust': 'ダイアモンドダスト',
        'Dreams Of Ice': '氷結の幻想',
        'Frost Blade': '凍てつく剣',
        'Frost Bow': '凍てつく弓',
        'Frost Staff': '凍てつく杖',
        'Glacier Bash': 'グレイシャーバッシュ',
        'Glass Dance': '氷雪乱舞',
        'Hailstorm': 'ヘイルストーム',
        'Heavenly Strike': 'ヘヴンリーストライク',
        'Icebrand': 'アイスブランド',
        'Icicle Impact': 'アイシクルインパクト',
        'Melt': 'ウェポンメルト',
        'Permafrost': 'パーマフロスト',
        'Whiteout': 'ホワイトアウト',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Ice Soldier': '寒冰士兵',
        'Shiva': '希瓦',
      },
      'replaceText': {
        '\\(circle\\)': '(圆)',
        '\\(cross\\)': '(十字)',
        'Absolute Zero': '绝对零度',
        'Avalanche': '雪崩',
        'Diamond Dust': '钻石星尘',
        'Dreams Of Ice': '寒冰的幻想',
        'Frost Blade': '冰霜之剑',
        'Frost Bow': '冰霜之弓',
        'Frost Staff': '冰霜之杖',
        'Glacier Bash': '冰河怒击',
        'Glass Dance': '冰雪乱舞',
        'Hailstorm': '冰雹',
        'Heavenly Strike': '天降一击',
        'Icebrand': '冰印剑',
        'Icicle Impact': '冰柱冲击',
        'Melt': '武器融化',
        'Permafrost': '永久冻土',
        'Whiteout': '白化视界',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Ice Soldier': '얼음 병사',
        'Shiva': '시바',
      },
      'replaceText': {
        '\\(circle\\)': '(원형)',
        '\\(cross\\)': '(십자)',
        'Absolute Zero': '절대영도',
        'Avalanche': '눈사태',
        'Diamond Dust': '다이아몬드 더스트',
        'Dreams Of Ice': '빙결의 환상',
        'Frost Blade': '얼어붙은 검',
        'Frost Bow': '얼어붙은 활',
        'Frost Staff': '얼어붙은 지팡이',
        'Glacier Bash': '빙하 강타',
        'Glass Dance': '빙설난무',
        'Hailstorm': '우박 폭풍',
        'Heavenly Strike': '천상의 일격',
        'Icebrand': '얼음의 낙인',
        'Icicle Impact': '고드름 낙하',
        'Melt': '무기 용해',
        'Permafrost': '영구동토',
        'Whiteout': '폭설',
      },
    },
  ],
};
