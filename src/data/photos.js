// ============================================================
// 照片数据源 —— 唯一需要你修改的文件
// src 填图床直链（sm.ms / ImgBB / PicGo+GitHub / 七牛 …，见文末推荐）
// ratio 填真实宽高比，瀑布流靠它防止加载抖动
// ============================================================

export const site = {
  name: 'NOCTURNE',
  nameZh: '夜光档案',
  slogan: '在黑暗里收集光。',
  owner: 'YZTXA',
  since: 2026,
  socials: [
    { label: 'GITHUB', href: 'https://github.com/anqiushi767-cell/youyadeci' },
    { label: 'BILIBILI', href: 'https://space.bilibili.com/3494359752247440' },
    { label: 'EMAIL', href: '#' }
  ]
}

export const albums = [
  { id: 'city',   name: '城市夜行',   en: 'NEON CITY',  desc: '午夜街道、霓虹与雨的反射。' },
  { id: 'nature', name: '山野拾光',   en: 'WILD LIGHT', desc: '山林、雾、星空与清晨。' },
  { id: 'film',   name: '胶片记忆',   en: 'FILM GRAIN', desc: '35mm 胶片扫描，颗粒感存档。' },
  { id: 'human',  name: '人间观察',   en: 'PEOPLE',     desc: '街头偶遇的面孔与瞬间。' }
]

const P = (id, album, title, date, seed, ratio = '3/4') => ({
  id, album, title, date, ratio,
  src: `https://picsum.photos/seed/${seed}/900/1200` // ← 换成你的图床直链
})

export const photos = [
  { id: 1, album: 'city', title: '雨夜十字路口', date: '2026-07-09', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784815345940_IMG_20260709_130744.jpg' },
  { id: 2, album: 'city', title: '便利店灯光',   date: '2026-07-11', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784815320093_IMG_20260711_160814.jpg' },
  { id: 3, album: 'city', title: '末班地铁',     date: '2026-04-19', ratio: '3/4', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784815293363_Camera_1040g34o322m9j8bi744g4bv1akbjk50vpiimfr0.jpg' },
  P(4,  'city',   '天桥上的风',   '2026-03-30', 'n4', '3/4'),
  P(5,  'city',   '霓虹巷口',     '2026-02-11', 'n5', '4/5'),
  P(6,  'city',   '凌晨四点的桥', '2026-01-25', 'n6', '16/9'),
  P(7,  'nature', '雾中山脊',     '2026-06-01', 'n7', '4/3'),
  P(8,  'nature', '溪谷晨光',     '2026-05-17', 'n8', '3/4'),
  P(9,  'nature', '银河拱桥',     '2026-04-08', 'n9', '16/9'),
  P(10, 'nature', '苔藓微距',     '2026-03-12', 'n10', '1/1'),
  P(11, 'nature', '雪线之上',     '2026-02-20', 'n11', '3/4'),
  P(12, 'film',   '褪色夏天',     '2025-12-30', 'n12', '4/3'),
  P(13, 'film',   '老相机与猫',   '2025-11-18', 'n13', '1/1'),
  P(14, 'film',   '巷口理发店',   '2025-10-06', 'n14', '3/4'),
  P(15, 'film',   '站台告别',     '2025-09-14', 'n15', '4/5'),
  P(16, 'human',  '棋局老人',     '2026-05-25', 'n16', '3/4'),
  P(17, 'human',  '滑板少年',     '2026-04-27', 'n17', '4/3'),
  P(18, 'human',  '窗边剪影',     '2026-03-08', 'n18', '3/4'),
  P(19, 'human',  '夜市摊主',     '2026-02-14', 'n19', '1/1'),
  P(20, 'human',  '雨中同行',     '2026-01-09', 'n20', '4/5')
]

export const albumById = id => albums.find(a => a.id === id)
export const photosOf = albumId => albumId ? photos.filter(p => p.album === albumId) : photos
export const countOf = albumId => photosOf(albumId).length