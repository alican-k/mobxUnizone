const universities = [
	{id: '1401', name: 'Abant İzzet Baysal Üniversitesi', city:'14'},
	{id: '3801', name: 'Abdullah Gül Üniversitesi', city:'38'},
	{id: '0101', name: 'Adana Bilim ve Teknoloji Üniversitesi', city:'01'},
	{id: '0201', name: 'Adnan Menderes Üniversitesi', city:'02'},
	{id: '0901', name: 'Afyon Kocatepe Üniversitesi', city:'09'},
	{id: '0301', name: 'Ağrı İbrahim Çeçen Üniversitesi', city:'03'},
	{id: '0401', name: 'Ahi Evran Üniversitesi', city:'04'},
	{id: '0701', name: 'Akdeniz Üniversitesi', city:'07'},
	{id: '6801', name: 'Aksaray Üniversitesi', city:'68'},
	{id: '0702', name: 'Alanya Alaaddin Keykubat Üniversitesi', city:'07'},
	{id: '0501', name: 'Amasya Üniversitesi', city:'05'},
	{id: '2601', name: 'Anadolu Üniversitesi', city:'26'},
	{id: '0601', name: 'Ankara Üniversitesi', city:'06'},
	{id: '0602', name: 'Ankara Sosyal Bilimler Üniversitesi', city:'06'},
	{id: '7501', name: 'Ardahan Üniversitesi', city:'75'},
	{id: '0801', name: 'Artvin Çoruh Üniversitesi', city:'08'},
	{id: '2501', name: 'Atatürk Üniversitesi', city:'25'},
	{id: '1001', name: 'Balıkesir Üniversitesi', city:'10'},
	{id: '1002', name: 'Bandırma Onyedi Eylül Üniversitesi', city:'10'},
	{id: '7401', name: 'Bartın Üniversitesi', city:'74'},
	{id: '7201', name: 'Batman Üniversitesi', city:'72'},
	{id: '6901', name: 'Bayburt Üniversitesi', city:'69'},
	{id: '1101', name: 'Bilecik Şeyh Edebali Üniversitesi', city:'11'},
	{id: '1201', name: 'Bingöl Üniversitesi', city:'12'},
	{id: '1301', name: 'Bitlis Eren Üniversitesi', city:'13'},
	{id: '3401', name: 'Boğaziçi Üniversitesi', city:'34'},
	{id: '6601', name: 'Bozok Üniversitesi', city:'66'},
	{id: '1601', name: 'Bursa Teknik Üniversitesi', city:'16'},
	{id: '4501', name: 'Celal Bayar Üniversitesi', city:'45'},
	{id: '5801', name: 'Cumhuriyet Üniversitesi', city:'58'},
	{id: '1701', name: 'Çanakkale Onsekiz Mart Üniversitesi', city:'17'},
	{id: '1801', name: 'Çankırı Karatekin Üniversitesi', city:'18'},
	{id: '0102', name: 'Çukurova Üniversitesi', city:'01'},
	{id: '3402', name: 'Deniz Harp Okulu', city:'34'},
	{id: '2101', name: 'Dicle Üniversitesi', city:'21'},
	{id: '3507', name: 'Dokuz Eylül Üniversitesi', city:'35'},
	{id: '4301', name: 'Dumlupınar Üniversitesi', city:'43'},
	{id: '8101', name: 'Düzce Üniversitesi', city:'81'},
	{id: '3508', name: 'Ege Üniversitesi', city:'35'},
	{id: '3802', name: 'Erciyes Üniversitesi', city:'38'},
	{id: '2401', name: 'Erzincan Üniversitesi', city:'24'},
	{id: '2502', name: 'Erzurum Teknik Üniversitesi', city:'25'},
	{id: '2602', name: 'Eskişehir Osmangazi Üniversitesi', city:'26'},
	{id: '2301', name: 'Fırat Üniversitesi', city:'23'},
	{id: '3403', name: 'Galatasaray Üniversitesi', city:'34'},
	{id: '0603', name: 'Gazi Üniversitesi', city:'06'},
	{id: '2701', name: 'Gaziantep Üniversitesi', city:'27'},
	{id: '6001', name: 'Gaziosmanpaşa Üniversitesi', city:'60'},
	{id: '4101', name: 'Gebze Teknik Üniversitesi', city:'41'},
	{id: '2801', name: 'Giresun Üniversitesi', city:'28'},
	{id: '2901', name: 'Gümüşhane Üniversitesi', city:'29'},
	{id: '0604', name: 'Hacettepe Üniversitesi', city:'06'},
	{id: '3001', name: 'Hakkari Üniversitesi', city:'30'},
	{id: '6301', name: 'Harran Üniversitesi', city:'63'},
	{id: '3404', name: 'Hava Harp Okulu', city:'34'},
	{id: '1901', name: 'Hitit Üniversitesi', city:'19'},
	{id: '7601', name: 'Iğdır Üniversitesi', city:'76'},
	{id: '4401', name: 'İnönü Üniversitesi', city:'44'},
	{id: '3101', name: 'İskenderun Teknik Üniversitesi', city:'31'},
	{id: '3405', name: 'İstanbul Medeniyet Üniversitesi', city:'34'},
	{id: '3406', name: 'İstanbul Üniversitesi', city:'34'},
	{id: '3407', name: 'İstanbul Teknik Üniversitesi', city:'34'},
	{id: '3503', name: 'İzmir Bakırçay Üniversitesi', city:'35'},
	{id: '3504', name: 'İzmir Demokrasi Üniversitesi', city:'35'},
	{id: '3505', name: 'İzmir Kâtip Çelebi Üniversitesi', city:'35'},
	{id: '3506', name: 'İzmir Yüksek Teknoloji Enstitüsü', city:'35'},
	{id: '3601', name: 'Kafkas Üniversitesi', city:'36'},
	{id: '4601', name: 'Kahramanmaraş Sütçü İmam Üniversitesi', city:'46'},
	{id: '7801', name: 'Karabük Üniversitesi', city:'78'},
	{id: '6101', name: 'Karadeniz Teknik Üniversitesi', city:'61'},
	{id: '7001', name: 'Karamanoğlu Mehmetbey Üniversitesi', city:'70'},
	{id: '0605', name: 'Kara Harp Okulu', city:'06'},
	{id: '3701', name: 'Kastamonu Üniversitesi', city:'37'},
	{id: '7101', name: 'Kırıkkale Üniversitesi', city:'71'},
	{id: '3901', name: 'Kırklareli Üniversitesi', city:'39'},
	{id: '7901', name: 'Kilis 7 Aralık Üniversitesi', city:'79'},
	{id: '4102', name: 'Kocaeli Üniversitesi', city:'41'},
	{id: '4201', name: 'Necmettin Erbakan Üniversitesi', city:'42'},
	{id: '4702', name: 'Mardin Artuklu Üniversitesi', city:'47'},
	{id: '3408', name: 'Marmara Üniversitesi', city:'34'},
	{id: '1501', name: 'Mehmet Akif Ersoy Üniversitesi', city:'15'},
	{id: '3301', name: 'Mersin Üniversitesi', city:'33'},
	{id: '3409', name: 'Mimar Sinan Güzel Sanatlar Üniversitesi', city:'34'},
	{id: '4801', name: 'Muğla Sıtkı Koçman Üniversitesi', city:'48'},
	{id: '6201', name: 'Munzur Üniversitesi', city:'62'},
	{id: '3102', name: 'Mustafa Kemal Üniversitesi', city:'31'},
	{id: '4901', name: 'Muş Alparslan Üniversitesi', city:'49'},
	{id: '5901', name: 'Namık Kemal Üniversitesi', city:'59'},
	{id: '5001', name: 'Nevşehir Hacı Bektaş Veli Üniversitesi', city:'50'},
	{id: '5101', name: 'Niğde Üniversitesi', city:'51'},
	{id: '5501', name: 'Ondokuz Mayıs Üniversitesi', city:'55'},
	{id: '5201', name: 'Ordu Üniversitesi', city:'52'},
	{id: '0606', name: 'Orta Doğu Teknik Üniversitesi', city:'06'},
	{id: '8001', name: 'Osmaniye Korkut Ata Üniversitesi', city:'80'},
	{id: '2002', name: 'Pamukkale Üniversitesi', city:'20'},
	{id: '0607', name: 'Polis Akademisi', city:'06'},
	{id: '5301', name: 'Recep Tayyip Erdoğan Üniversitesi', city:'53'},
	{id: '0608', name: 'Sahil Güvenlik Akademisi', city:'06'},
	{id: '5401', name: 'Sakarya Üniversitesi', city:'54'},
	{id: '4202', name: 'Selçuk Üniversitesi', city:'42'},
	{id: '5601', name: 'Siirt Üniversitesi', city:'56'},
	{id: '5701', name: 'Sinop Üniversitesi', city:'57'},
	{id: '3201', name: 'Süleyman Demirel Üniversitesi', city:'32'},
	{id: '7201', name: 'Şırnak Üniversitesi', city:'72'},
	{id: '2201', name: 'Trakya Üniversitesi', city:'22'},
	{id: '3410', name: 'Türk Alman Üniversitesi', city:'34'},
	{id: '3411', name: 'Sağlık Bilimleri Üniversitesi', city:'34'},
	{id: '3412', name: 'Türkiye Uluslararası İslam, Bilim ve Teknoloji Üniversitesi', city:'34'},
	{id: '1602', name: 'Uludağ Üniversitesi', city:'16'},
	{id: '6401', name: 'Uşak Üniversitesi', city:'64'},
	{id: '7701', name: 'Yalova Üniversitesi', city:'77'},
	{id: '3413', name: 'Yıldız Teknik Üniversitesi', city:'34'},
	{id: '0609', name: 'Yıldırım Beyazıt Üniversitesi', city:'06'},
	{id: '6501', name: 'Yüzüncü Yıl Üniversitesi', city:'65'},
	{id: '6701', name: 'Bülent Ecevit Üniversitesi', city:'67'},

];



export const cities = [
	{no: '34', name: 'İstanbul'},
	{no: '35', name: 'İzmir'}
];

export default universities;


/*
https://tr.wikipedia.org/wiki/T%C3%BCrkiye%27deki_%C3%BCniversiteler_listesi

Abant İzzet Baysal Üniversitesi	Bolu
Abdullah Gül Üniversitesi Kayseri
Adana Bilim ve Teknoloji Üniversitesi Adana
Adıyaman Üniversitesi Adıyaman
Adnan Menderes Üniversitesi	Aydın
Afyon Kocatepe Üniversitesi	Afyonkarahisar
Ağrı İbrahim Çeçen Üniversitesi Ağrı
Ahi Evran Üniversitesi Kırşehir
Akdeniz Üniversitesi Antalya
Aksaray Üniversitesi Aksaray
Alanya Alaaddin Keykubat Üniversitesi Antalya
Amasya Üniversitesi	Amasya
Anadolu Üniversitesi Eskişehir
Ankara Üniversitesi	Ankara
Ankara Sosyal Bilimler Üniversitesi	Ankara
Ardahan Üniversitesi Ardahan
Artvin Çoruh Üniversitesi Artvin
Atatürk Üniversitesi Erzurum
Balıkesir Üniversitesi Balıkesir
Bandırma Onyedi Eylül Üniversitesi	2015	Balıkesir
Bartın Üniversitesi Bartın
Batman Üniversitesi Batman
Bayburt Üniversitesi Bayburt
Bilecik Şeyh Edebali Üniversitesi Bilecik
Bingöl Üniversitesi Bingöl
Bitlis Eren Üniversitesi Bitlis
Boğaziçi Üniversitesi İstanbul
Bozok Üniversitesi Yozgat
Bursa Teknik Üniversitesi Bursa
Celal Bayar Üniversitesi Manisa
Cumhuriyet Üniversitesi Sivas
Çanakkale Onsekiz Mart Üniversitesi Çanakkale
Çankırı Karatekin Üniversitesi Çankırı
Çukurova Üniversitesi Adana
Deniz Harp Okulu İstanbul
Dicle Üniversitesi Diyarbakır
Dokuz Eylül Üniversitesi İzmir
Dumlupınar Üniversitesi Kütahya
Düzce Üniversitesi Düzce
Ege Üniversitesi İzmir
Erciyes Üniversitesi Kayseri
Erzincan Üniversitesi Erzincan
Erzurum Teknik Üniversitesi Erzurum
Eskişehir Osmangazi Üniversitesi Eskişehir
Fırat Üniversitesi Elâzığ
Galatasaray Üniversitesi İstanbul
Gazi Üniversitesi Ankara
Gaziantep Üniversitesi Gaziantep
Gaziosmanpaşa Üniversitesi Tokat
Gebze Teknik Üniversitesi Kocaeli
Giresun Üniversitesi Giresun
Gümüşhane Üniversitesi Gümüşhane
Hacettepe Üniversitesi Ankara
Hakkari Üniversitesi Hakkari
Harran Üniversitesi Şanlıurfa
Hava Harp Okulu	İstanbul
Hitit Üniversitesi Çorum
Iğdır Üniversitesi Iğdır
İnönü Üniversitesi Malatya
İskenderun Teknik Üniversitesi Hatay
İstanbul Medeniyet Üniversitesi İstanbul
İstanbul Üniversitesi İstanbul
İstanbul Teknik Üniversitesi İstanbul
İzmir Bakırçay Üniversitesi İzmir
İzmir Demokrasi Üniversitesi İzmir
İzmir Kâtip Çelebi Üniversitesi İzmir
İzmir Yüksek Teknoloji Enstitüsü İzmir
Kafkas Üniversitesi Kars
Kahramanmaraş Sütçü İmam Üniversitesi Kahramanmaraş
Karabük Üniversitesi Karabük
Karadeniz Teknik Üniversitesi Trabzon
Karamanoğlu Mehmetbey Üniversitesi Karaman
Kara Harp Okulu Ankara
Kastamonu Üniversitesi Kastamonu
Kırıkkale Üniversitesi Kırıkkale
Kırklareli Üniversitesi Kırklareli
Kilis 7 Aralık Üniversitesi Kilis
Kocaeli Üniversitesi Kocaeli
Necmettin Erbakan Üniversitesi Konya
Mardin Artuklu Üniversitesi Mardin
Marmara Üniversitesi İstanbul
Mehmet Akif Ersoy Üniversitesi Burdur
Mersin Üniversitesi Mersin
Mimar Sinan Güzel Sanatlar Üniversitesi İstanbul
Muğla Sıtkı Koçman Üniversitesi Muğla
Munzur Üniversitesi Tunceli
Mustafa Kemal Üniversitesi Hatay
Muş Alparslan Üniversitesi Muş
Namık Kemal Üniversitesi Tekirdağ
Nevşehir Hacı Bektaş Veli Üniversitesi Nevşehir
Niğde Üniversitesi Niğde
Ondokuz Mayıs Üniversitesi Samsun
Ordu Üniversitesi Ordu
Orta Doğu Teknik Üniversitesi Ankara
Osmaniye Korkut Ata Üniversitesi Osmaniye
Pamukkale Üniversitesi Denizli
Polis Akademisi Ankara
Recep Tayyip Erdoğan Üniversitesi Rize
Sahil Güvenlik Akademisi Ankara
Sakarya Üniversitesi Sakarya
Selçuk Üniversitesi Konya
Siirt Üniversitesi Siirt
Sinop Üniversitesi Sinop
Süleyman Demirel Üniversitesi Isparta
Şırnak Üniversitesi Şırnak
Trakya Üniversitesi Edirne
Türk Alman Üniversitesi İstanbul
Sağlık Bilimleri Üniversitesi İstanbul
Türkiye Uluslararası İslam, Bilim ve Teknoloji Üniversitesi İstanbul
Uludağ Üniversitesi Bursa
Uşak Üniversitesi Uşak
Yalova Üniversitesi Yalova
Yıldız Teknik Üniversitesi İstanbul
Yıldırım Beyazıt Üniversitesi Ankara
Yüzüncü Yıl Üniversitesi Van
Bülent Ecevit Üniversitesi Zonguldak
*/
