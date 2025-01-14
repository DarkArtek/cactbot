import UserConfig from '../../resources/user_config';

UserConfig.registerOptions('jobs', {
  options: [
    {
      id: 'JustBuffTracker',
      name: {
        en: 'Only show the party buff tracker',
        de: 'Zeige nur den Gruppen Buff-Tracker',
        fr: 'Afficher seulement le tracker de buff de l\'équipe',
        ja: 'シナジー効果のみを表示する',
        cn: '仅监控团辅技能',
        ko: '파티 버프만 표시',
      },
      type: 'checkbox',
      default: false,
    },
    {
      id: 'LowerOpacityOutOfCombat',
      name: {
        en: 'Lower ui opacity when out of combat',
        de: 'Veringere die Deckkraft auserhalb des Kampfes',
        fr: 'Diminiuer l\'opacité de l\'UI hors combat',
        ja: '非戦闘時にUIを透過する',
        cn: '非战斗状态时使UI半透明',
        ko: '전투 중이 아닐 때, UI 투명도 높이기',
      },
      type: 'checkbox',
      default: true,
    },
    {
      id: 'OpacityOutOfCombat',
      name: {
        en: 'Opacity of ui when out of combat',
        de: 'Deckkraft der UI auserhalb des Kampfes',
        fr: 'Opacité de l\'UI hors combat',
        ja: '非戦闘時のUI透過度',
        cn: '非战斗状态时的UI透明度',
        ko: '전투 중이 아닐 때, UI 투명도',
      },
      type: 'float',
      default: 0.5,
    },
    {
      id: 'PlayCountdownSound',
      name: {
        en: 'Enable countdown notification sound',
        de: 'Aktiviere Countdown Hinweis-Ton',
        fr: 'Activer la notification sonore du compte à rebours',
        ja: 'カウントダウンを音声で知らせる',
        cn: '启用倒计时提示音',
        ko: '초읽기 알림 소리 켜기',
      },
      type: 'checkbox',
      default: true,
    },
    {
      id: 'HideWellFedAboveSeconds',
      name: {
        en: 'Hide cheese icon when food > time (in seconds)',
        de: 'Verstecke das Käse Icon wenn Bufffood > Zeit (in Sekunden)',
        fr: 'Masquer l\'icône du fromage lorsque vous êtes repu > durée (en secondes)',
        ja: '飯効果の時間が不足したらチーズアイコンを表示する (秒)',
        cn: '食物 Buff 剩余时间不足警报 (秒)',
        ko: '남은 식사 효과 시간이 이 시간보다 길면, 치즈 아이콘 숨김 (단위: 초)',
      },
      type: 'integer',
      default: 15 * 60,
    },
    {
      id: 'ShowMPTickerOutOfCombat',
      name: {
        en: 'Show MP ticker out of combat',
        de: 'Zeige MP-Ticker auserhalb des Kampfes',
        fr: 'Afficher le symbole PM hors combat',
        ja: '非戦闘時にもMPを表示する',
        cn: '一直显示MP监控',
        ko: '전투 중이 아닐 때, MP 티커 표시',
      },
      type: 'checkbox',
      default: false,
    },
    {
      id: 'MidHealthThresholdPercent',
      name: {
        en: 'Percent of health considered middling',
        de: 'Prozent der Lebenspunkte (mittelmaß)',
        fr: 'Pourcentage de vie considéré comme moyenne',
        ja: '健康なHPとして扱うHP量 (1 = 100%)',
        cn: '中等血量阈值 (1 = 100%)',
        ko: '보통 HP로 취급될 HP비율 (1 = 100%)',
      },
      type: 'float',
      default: 0.8,
    },
    {
      id: 'LowHealthThresholdPercent',
      name: {
        en: 'Percent of health considered low',
        de: 'Prozent der Lebenspunkte (gering)',
        fr: 'Pourcentage de vie considéré comme bas',
        ja: '危険なHPとして扱うHP量 (1 = 100%)',
        cn: '危险血量阈值 (1 = 100%)',
        ko: '낮은 HP로 취급될 HP비율 (1 = 100%)',
      },
      type: 'float',
      default: 0.2,
    },
    {
      id: 'BigBuffShowCooldownSeconds',
      name: {
        en: 'Minimum seconds on a cooldown before shown',
        de: 'Minimum an Sekunden für einen Cooldown vor der Anzeige',
        fr: 'Nombre minimal de secondes avant l\'affichage du temps de recharge',
        ja: 'シナジースキルが使用可能前にアイコンを表示する (秒)',
        cn: '团辅冷却完成预告 (秒)',
        ko: '재사용 대기시간을 표시할 기준 시간(초 이하)',
      },
      type: 'float',
      default: 20,
    },
    {
      id: 'BigBuffIconWidth',
      name: {
        en: 'Width of buff icons (px)',
        de: 'Weite des Buff Icons (px)',
        fr: 'Largeur des icônes de buff (pixel)',
        ja: 'シナジースキルのアイコンの広さ (pixel)',
        cn: '团辅监控图标宽度 (像素)',
        ko: '버프 아이콘 너비 (pixel)',
      },
      type: 'integer',
      default: 44,
    },
    {
      id: 'BigBuffIconHeight',
      name: {
        en: 'Height of buff icons (px)',
        de: 'Höhe des Buff Icons (px)',
        fr: 'Hauteur des icônes de buff (pixel)',
        ja: 'シナジースキルのアイコンの高さ (pixel)',
        cn: '团辅监控图标高度 (像素)',
        ko: '버프 아이콘 높이 (pixel)',
      },
      type: 'integer',
      default: 32,
    },
    {
      id: 'BigBuffBarHeight',
      name: {
        en: 'Height of buff timer bars (px)',
        de: 'Höhe der Buff-Timer Leisten (px)',
        fr: 'Hauteur des barres de temps de buff (pixel)',
        ja: 'シナジースキルのタイムバーの高さ (pixel)',
        cn: '团辅监控计时条高度 (像素)',
        ko: '버프 타이머 바 높이 (pixel)',
      },
      type: 'integer',
      default: 5,
    },
    {
      id: 'BigBuffTextHeight',
      name: {
        en: 'Height of buff text (px)',
        de: 'Höhe des Buff-Text (px)',
        fr: 'Hauteur du texte de buff (pixel)',
        ja: 'シナジースキルのテキストの高さ (pixel)',
        cn: '团辅监控文字高度 (像素)',
        ko: '버프 텍스트 높이 (pixel)',
      },
      type: 'integer',
      default: 0,
    },
    {
      id: 'BigBuffBorderSize',
      name: {
        en: 'Size of buff borders (px)',
        de: 'Größe der Buff-Ränder (px)',
        fr: 'Taille des bordures de buff (pixel)',
        ja: 'シナジースキルのボーダーの広さ (pixel)',
        cn: '团辅监控边框尺寸 (像素)',
        ko: '버프 아이콘 테두리 크기 (pixel)',
      },
      type: 'integer',
      default: 1,
    },
    {
      id: 'GpAlarmPoint',
      name: {
        en: 'GP alarm threshold (0 to disable)',
        de: 'SP Alarm Grenze (0 to disable)',
        fr: 'Seuil d\'alarme PR (0 pour désactiver)',
        ja: 'GPが低い時に警告する (０＝無効)',
        cn: '低采集力提示阈值 (0为禁用)',
        ko: 'GP 알람 설정값 (0 = 기능 정지)',
      },
      type: 'integer',
      default: 0,
    },
    {
      id: 'GpAlarmSoundVolume',
      name: {
        en: 'GP alarm sound (0-1)',
        de: 'SP Alarm Sound (0-1)',
        fr: 'Son d\'alarme PR (0-1)',
        ja: '低いGPの警告音量 (0-1)',
        cn: '低采集力提示音量 (0-1)',
        ko: 'GP 알람 소리 크기 (0-1)',
      },
      type: 'float',
      default: 0.8,
    },
    {
      id: 'NotifyExpiredProcsInCombat',
      name: {
        en: 'Flash procs boxes of inactive dots/etc. up to n times while in combat. (-1: disabled, 0: infinite)',
        de: 'Dot/etc. boxen blinken bis zu n mal wenn im Kampf und dot ist nicht aktiv. (-1: deaktiviert, 0: ohne Limit)',
      },
      type: 'integer',
      default: -1,
    },
  ],
});
