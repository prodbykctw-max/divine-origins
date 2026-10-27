/* Tab images for the 15 tradition groups: real, recognizable photos of each tradition's
   art and holy places (public domain / CC0 / CC BY / CC BY-SA, via Wikimedia Commons).
   Files: img/traditions/tabs/<id>.webp (480x320 crops). Credits are shown under the rail. */
const BASE = (typeof window !== 'undefined' && window.__IMG_BASE__) || 'img/';
export const TAB_IMAGES = {
 "mesopotamian": {
  "file": "traditions/tabs/mesopotamian.webp",
  "title": "Lamassu (winged bull guardian) from the North-West Palace at Nimrud, 9th century BCE",
  "where": "British Museum, London",
  "credit": "APK — via Wikimedia Commons (CC BY 4.0)",
  "license": "CC BY 4.0",
  "source": "https://commons.wikimedia.org/wiki/File:Lamassu_from_the_Throne_Room,_North-West_Palace_at_Nimrud,_British_Museum_-_1.jpg"
 },
 "egyptian": {
  "file": "traditions/tabs/egyptian.webp",
  "title": "Sphinx of Hatshepsut",
  "where": "The Metropolitan Museum of Art, New York",
  "credit": "The Metropolitan Museum of Art, New York — Open Access (CC0) — Rogers Fund, 1931",
  "license": "CC0 (Met Open Access, public domain)",
  "source": "https://www.metmuseum.org/art/collection/search/544442"
 },
 "canaanite": {
  "file": "traditions/tabs/canaanite.webp",
  "title": "Baal with Thunderbolt stele, Ugarit",
  "where": "Musée du Louvre, Paris",
  "credit": "Jastrow — via Wikimedia Commons (Public domain)",
  "license": "Public domain",
  "source": "https://commons.wikimedia.org/wiki/File:Baal_thunderbolt_Louvre_AO15775.jpg"
 },
 "hebrew": {
  "file": "traditions/tabs/hebrew.webp",
  "title": "Menorah of the Jerusalem Temple, carved on the Arch of Titus, 81 CE",
  "where": "Arch of Titus, Rome",
  "credit": "Gunnar Bach Pedersen — via Wikimedia Commons (CC0)",
  "license": "CC0",
  "source": "https://commons.wikimedia.org/wiki/File:Menorah_(Arc_de_Titus,_Rome).jpg"
 },
 "ethiopian": {
  "file": "traditions/tabs/ethiopian.webp",
  "title": "Bete Giyorgis, rock-hewn Church of St George, Lalibela, 12th–13th century",
  "where": "Lalibela, Ethiopia",
  "credit": "Bernard Gagnon — via Wikimedia Commons (CC BY-SA 3.0)",
  "license": "CC BY-SA 3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Bete_Giyorgis_01.jpg"
 },
 "gnostic": {
  "file": "traditions/tabs/gnostic.webp",
  "title": "Abraxas intaglio gem",
  "where": "Thorvaldsens Museum, Copenhagen",
  "credit": "Jakob Faurvig — via Wikimedia Commons (CC0)",
  "license": "CC0",
  "source": "https://commons.wikimedia.org/wiki/File:Abraxas_I1679.jpg"
 },
 "christian": {
  "file": "traditions/tabs/christian.webp",
  "title": "Christ Pantocrator, 6th-century encaustic icon",
  "where": "Saint Catherine's Monastery, Sinai",
  "credit": "Unknown — via Wikimedia Commons (Public domain)",
  "license": "Public domain",
  "source": "https://commons.wikimedia.org/wiki/File:Spas_vsederzhitel_sinay.jpg"
 },
 "greek": {
  "file": "traditions/tabs/greek.webp",
  "title": "Artemision Bronze (Zeus or Poseidon)",
  "where": "National Archaeological Museum, Athens",
  "credit": "Jebulon — via Wikimedia Commons (CC0)",
  "license": "CC0",
  "source": "https://commons.wikimedia.org/wiki/File:Bronze_Zeus_or_Poseidon_NAMA_X_15161_Athens_Greece.jpg"
 },
 "zoroastrian": {
  "file": "traditions/tabs/zoroastrian.webp",
  "title": "Faravahar relief, Persepolis",
  "where": "Persepolis (in situ)",
  "credit": "Napishtim — via Wikimedia Commons (CC BY-SA 3.0)",
  "license": "CC BY-SA 3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Persepolis_-_carved_Faravahar.JPG"
 },
 "hindu": {
  "file": "traditions/tabs/hindu.webp",
  "title": "Nataraja, Chola bronze",
  "where": "Government Museum, Chennai",
  "credit": "Richard Mortel from Riyadh, Saudi Arabia — via Wikimedia Commons (CC BY 2.0)",
  "license": "CC BY 2.0",
  "source": "https://commons.wikimedia.org/wiki/File:Nataraja,_Chola_period_bronze,_11th_century,_Government_Museum,_Chennai.jpg"
 },
 "buddhist": {
  "file": "traditions/tabs/buddhist.webp",
  "title": "The Great Buddha (Daibutsu) of Kōtoku-in, 1252",
  "where": "Kamakura, Japan",
  "credit": "Alexandar Vujadinovic — via Wikimedia Commons (CC BY-SA 4.0)",
  "license": "CC BY-SA 4.0",
  "source": "https://commons.wikimedia.org/wiki/File:The_Great_Buddha_of_Kamakura.jpg"
 },
 "east_asian": {
  "file": "traditions/tabs/east_asian.webp",
  "title": "The great torii of Itsukushima Shrine",
  "where": "Miyajima, Japan",
  "credit": "JordyMeow — via Wikimedia Commons (CC BY-SA 3.0)",
  "license": "CC BY-SA 3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Itsukushima_Gate.jpg"
 },
 "norse_celtic": {
  "file": "traditions/tabs/norse_celtic.webp",
  "title": "Gundestrup cauldron",
  "where": "National Museum of Denmark, Copenhagen",
  "credit": "Nationalmuseet, Lennart Larsen — via Wikimedia Commons (CC BY-SA 3.0)",
  "license": "CC BY-SA 3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Gundestrup_cauldron_-_F.I.4277.jpg"
 },
 "african": {
  "file": "traditions/tabs/african.webp",
  "title": "Ife brass head of a king (Ooni)",
  "where": "British Museum, London",
  "credit": "Vassil — via Wikimedia Commons (CC0)",
  "license": "CC0",
  "source": "https://commons.wikimedia.org/wiki/File:British_Museum_Room_25_Head_of_a_king_Ife_17022019_5147.jpg"
 },
 "indigenous": {
  "file": "traditions/tabs/indigenous.webp",
  "title": "Aztec Sun Stone",
  "where": "Museo Nacional de Antropología, Mexico City",
  "credit": "Gary Todd — via Wikimedia Commons (CC0)",
  "license": "CC0",
  "source": "https://commons.wikimedia.org/wiki/File:Aztec_Sun_Stone_or_Calendar_Stone.jpg"
 }
};
export function tabImage(id) {
  const t = TAB_IMAGES[id];
  return t ? { ...t, url: BASE + t.file } : null;
}
