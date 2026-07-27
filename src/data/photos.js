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
  { id: 4, album: 'city', title: '天桥上的风',   date: '2026-03-30', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784988848892_img-1773231050310ad88502363d052ea209ac37f98fe4f0e68211c72b79333eb76f481384c5c978a.jpg' },
  { id: 5, album: 'city', title: '霓虹巷口',     date: '2026-02-11', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784988744725_img-1622735297279b6a52275af97a6a4f180f85d5c8866c5.jpg' },
  { id: 6, album: 'city', title: '凌晨四点的桥', date: '2026-01-25', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784988555001_img-16215507964120d5190fc29535ce7067fc2136e3f5546.jpg' },
  { id: 7, album: 'nature', title: '雾中山脊',   date: '2026-06-01', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784988562559_img-1621550818902f9e3e6daffc90d67cb6e056b934cccfa.jpg' },
  { id: 8, album: 'nature', title: '溪谷晨光',   date: '2026-05-17', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784988534366_img-1621550823495bb2dc9e14513637b68cbe6abd36b7bd3.jpg' },
  { id: 9, album: 'nature', title: '银河拱桥',   date: '2026-04-08', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784988853144_img-17732310570681f442bca99dc16bcee8cf95f2bf14b774d663129a15dc0442ce15d3ffd49a1f0.jpg' },
  { id: 10, album: 'nature', title: '苔藓微距', date: '2026-03-12', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784988843553_img-177332847592211535523bea4b3bc50bc3d1e2766184d345f35347ab9aae659c473146d0048c9.jpg' },
  { id: 11, album: 'nature', title: '雪线之上', date: '2026-02-20', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784988556870_img-1621550792376c53346c692d768bf9b7d00ee9bc65f0e.jpg' },
  { id: 12, album: 'film',   title: '褪色夏天', date: '2025-12-30', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784986983201_img-1784848122610e54b019a657039103cab158fee15090383796cf447ff9ff8d6afdb92e1d32411.jpg' },
  { id: 13, album: 'film',   title: '老相机与猫', date: '2025-11-18', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784987574949_1755673917118.png' },
  { id: 14, album: 'film',   title: '巷口理发店', date: '2025-10-06', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784988325321_13f7ca04e2a9647b4c8ee6b3b7f2d0e9.png' },
  { id: 15, album: 'film',   title: '站台告别', date: '2025-09-14', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784987737867_img-17762542494207ecbe7c1548c985c94011681c810efd9225e5b4f4f80aa3fbf4938a33020ecea.jpg' },
  { id: 16, album: 'human',  title: '棋局老人', date: '2026-05-25', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784987712724_img-17762542861896bb13071f60064e66f017f22e16f5bb1fe85e072fdbb477e7535f8ceb946fefb.jpg' },
  { id: 17, album: 'human',  title: '滑板少年', date: '2026-04-27', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784987615648_Screenshot_2024-08-11-13-55-05-800_lockscreen.jpg' },
  { id: 18, album: 'human', title: '窗边剪影', date: '2026-03-08', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784987053808_Screenshot_20260528_111526.jpg' },
  { id: 19, album: 'human', title: '夜市摊主', date: '2026-02-14', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784986976597_Camera_XHS_1782740946026.jpg' },
  { id: 20, album: 'human', title: '雨中同行', date: '2026-01-09', ratio: '4/3', src: 'https://cloudflare-imgbed-qm6.pages.dev/file/1784783488277_IMG_20260714_182245.jpg' },
]

export const albumById = id => albums.find(a => a.id === id)
export const photosOf = albumId => albumId ? photos.filter(p => p.album === albumId) : photos
export const countOf = albumId => photosOf(albumId).length