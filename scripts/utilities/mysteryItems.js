/*jshint -W033 */
/*jshint -W098 */

/**
 * ! These answers may not all be correct, or the item may not be spelled right.
 * 
 * Include in userscipt using:
 * @require     https://raw.githubusercontent.com/marascript/userscripts/master/scripts/utilities/mysteryItems.js
 * 
 * Use these sites to get the answer (maybe):
 * https://mara.guide/mysteryitem.php
 * https://www.marasites.com/?name=Dani&page=MysteryItemGuide
 * https://mara.page/Dani/MysteryItemGuide2
 * https://mara.page/Dani/tessssssssst
 * https://marapics.blogspot.com/?view=flipcard
 * 
 * If the answers image URL is is hosted on Marapets, add the image name and answer to knownItems.
 * Example:
 * 
 * https://images.marapets.com/icefairy/jentnerkommeroggar.png
 * 
 * So you would add:
 * "jentnerkommeroggar.png": "Heavy Concoction"
 */

 const knownItems = {
    "euwirywoqk.gif": "10th Birthday Cake?",

    "bbjkkeyccd.gif": "Alien Grapes",
    "iihujnbhge.gif": "Alien Grapes",
    "fhdsflhslsdhf.gif": "Andy",
    "sdhflfhslhdf.gif": "Angel Hits",
    "ggyhtujfkroidfs.gif": "Angelic Wings",
    "ffjiaogfopfjgkdo.gif": "Anime Wig",

    "sjdjdidosos.gif": "Ball of Bronze Yarn",
    "dfhsdfhslfh.gif": "Balloon Collecting Guide",
    "krindixi.gif": "Banana Pen",
    "gygygjgkgl.gif": "Battle Fairy Glowing Egg",
    "kkgweertpz.gif": "Bay Leaves",
    "dggepkkvvq.gif": "Beach",
    "ffgffdsasd.gif": "Beast in the Box",
    "jhgkukikyiyk.gif": "Beebot",
    "ccpwebyqxk.gif": "Bell",
    "jgjgkkkyk.gif": "Bigne Trading Card",
    "hgjkslroswi.gif": "Blackjack Toy",
    "shdksoisoso.gif": "Blitzen Horns",
    "plokijuhgrfedws.gif": "Blue Drab",
    "hervotam.gif": "Blueberry Soda",
    "yrwqkpkpnbvxxsd.gif": "Book of Beaches",
    "ddfouybeth.gif": "Book Of Bees",
    "ppweoofgkk.gif": "Bop",
    "hjskkaieien.gif": "Bounchy Plushie",
    "hjkuikjgg.gif": "Bowling Ball",
    "hflkfhldfhlhf.gif": "Box of Tissues",
    "miteriokondrierogandrebusker.png": "Brown Rofling Plushie",

    "wsedrftgyhujkio.gif" : "Candy Corn Cake",
    "hfdlfhshfls.gif": "Candy Floss Trading Card",
    "omaeskapaaskulenaasann.png": "Candycane Pin Up Dress",
    "vbfghjtuyercfwd.gif": "Cheese Potato",
    "vghbnjlkiytrqdc.gif": "Cherry Safety Lolly",
    "hhepinbhvr.gif": "Cherry Sugar Glass?",
    "jshshshshshs.gif": "Chibs Shield",
    "lkfhkkksksksks.gif": "Chocolate Strawberry Treats",
    "loaitsowor.gif": "Christmas Cake",
    "oopooioolk.gif": "Christmas Morning",
    "vbvbxcxcsd.gif": "Christmas Pop Up Book",
    "ghjgkydksk.gif": "Christmas Spork",
    "jskhysueo.gif": "Christmas Tree Yo Yo",
    "hjgkdlpqirbmxvd.gif": "Clown Muffin",
    "nnannbnncn.gif": "Corrupted Red Glowing Egg",
    "zzsowfnutg.gif": "Corrupted Yellow Glowing Egg",

    "sqprotidnsoewp.gif": "Dakota Notepad ",
    "jopoiujkio.gif": "Decadal Whip",
    "lplpkjkjhy.gif": "Deluxe Hot Dog",
    "fhsklfhsf.gif": "Dentist Ticket",
    "sjdjsdisoisos.gif": "Digital Gumball",
    "yghhrupwnb.gif": "Digital Noises",
    "ccbcchccgc.gif": "Digital Sugar Cube",
    "xvzbxvdgsfetrsf.gif": "Domino Plushie",
    "pimplsno.gif": "Drift Wood",
    "ljkhghjpoyjnmbg.gif": "Dukka Coin Skirt",
    
    "rewertytre.gif": "Easter Pancakes",
    "sjsoisososo.gif": "Ebi Shrimp",
    "hhgyhtyuhtu.gif": "Elvis Wig",
    "fhslkdfhsdf.gif": "Empty Plate",
    "zyxtcrvewb.gif": "Enchanted Magenta Astro Plushie",
    "jsjdkdeoeoe.gif": "Eucalyptus",
    "jghkmyikyfy.gif": "Extra Pet Giftbox",
    "predcfvggyujhsq.gif": "Eye Drops",
    "qbbxoprtjm.gif": "Eye Egg",
    "swsedrfvbgyhjkl.gif": "Eye Egg",

    "sosofefivm.gif": "Falling Petals",
    "ddaonncbrz.gif": "Feta",
    "didjwawa.gif": "Figure Skating",
    "xmnuyrgh.gif": "Fire Shower Charm",
    "siliofop.gif": "Fire Spell",
    "ikkesakteikkjefort.png": "Firefly",
    "spsotnsiotg.gif": "Flower Bed",
    "oknjuhvgtfxdsaw.gif": "Flower Beetle",
    "fgskfggfssf.gif": "Foh",
    "rtmiyghr.gif": "Football Attack Boot",
    "ityhnfmjkhjgj.gif": "Frozen Necklace",

    "kpyrvgwwxdppyii.gif": "Garlic Necklace",
    "bbzxmppkuwttfdg.gif": "Ghost Floaties",
    "jffffklfllllllllllllll.gif": "Giant Red Apple",
    "ddasffsgddhyggf.gif": "Giant Salad",
    "rrybyvgwee.gif": "Giant Squash",
    "joioososo.gif": "Gigantic Fairy Doll",
    "pptgkwwbcy.gif": "GizmOs",
    "cnvbdhfgry.gif": "Glass Paffuto Plushie",
    "satfdserfv.gif": "Gold Calla Lily",
    "jiyrwdbnmm.gif": "Gonk Voodoo Doll",
    "eenbvvioyt.gif": "Good Witch Skirt",
    "jjkukkkytrew.gif": "Grey Paffint",
    "kkgjdjslsls.gif": "Green Grint Foot",
    "tykkkeeeikkjedet.png": "Green Hick Plate",
    "aslkalksjd.gif": "Green Whisp?",
    "tyjhkiskdlroytifv.gif": "Grilled Fish",
    "hjgkfldseruyygt.gif": "Gummy Scorpion",

    "jentnerkommeroggar.png": "Heavy Concoction",
    "cxcxcvcvbv.gif": "Homeless Fairy Wings",
    "utokglapsgehrt.gif": "Hoop Earrings",
    "tyuwqopjnnhj.gif": "Hula Doll",

    "bvgytokqarcxtuj.gif": "Ice Fairy Wings",
    "gfgflglmbmiss.gif": "Icy Cooker",
    "mnpoqwzxtj.gif": "Injured Jam Tart",
    "kfjdkfjdhs.gif": "Invisible Soup?",
    "mthawpro.gif": "Iris Seeds",

    "adgjloyecbtgkuz.gif": "Jar of Bricks ",
    "ykgkguicgh.gif": "Jar of Flowers",
    "hjyukyikyyktk.gif": "Jar of Roses",
    "bnvmgkhjyutiwpf.gif": "Jar of Snow",
    "shsisisise.gif": "Jasmine",
    "hjfdtyuioh.gif": "Jenoa Wig",
    "flkhkkdkdkdkd.gif": "Jumping Spider",
    
    "yfcwaxpkujjbtrf.gif": "Kawaii Beats",
    "vvuggihhoj.gif": "King Baspinar Beach Ball",

    "skddodoso.gif": "Ladybird",
    "owoqmsmnfjg.gif": "Leaf Charm",
    "bopadomy.gif": "Leather Shoes",
    "aloftisheog.gif": "Light Up Ushunda",
    "eefeegtreg.gif": "Lightning Shield",
    "fghjhgkkfkg.gif": "Lump of Coal",

    "uyjhmnbhjurfcde.gif": "Memory Pets Stamp",
    "jhuukikiki.gif": "Microphone",
    "sjsduyweyw.gif": "Motherboard",
    "pqowieurythgnvb.gif": "Mummy Poera Plushie",
    "fldkdjjfjfjfjf.gif": "Mutant Squid Soup",
    "mmecdefhop.gif": "Melted Snowman/Snowman Pancakes?",

    "alskwieuvn.gif": "Naga Stamp",
    "dslhfsldhflkdf.gif": "New Male Certificate",
    "jsueosldkdkd.gif": "Newth Book",
    "sjsjeoeofo.gif": "Newth Necklace",
    "ikjjeesydepaaenfinda.png": "Nutcracker Action Figure",

    "jdhshjsis.gif": "Obese Fairy Doll",
    "jkkkikikkk.gif": "Orange Watch Battery",

    "zpxocidksl.gif": "Parpy",
    "dfgdfgggh.gif": "Peanuts",
    "jjhhgghjkk.gif": "Peasant Fairy Gloves ",
    "dkfjghrutyvbxpq.gif": "Peeler",
    "xxpwbyzvcj.gif": "Peppermint Wig",
    "sanndaaaemmifeari.png": "Pink Doyow?",
    "ekalwofirt.gif": "Pink Fertiliser",
    "aamlplplkj.gif": "Pink Jelly Sticky Hand",
    "jigipapa.gif": "Pistachio Nuts",
    "juiophf.gif": "Pistachio Nuts",
    "sjddisiisis.gif": "Plaster",
    "ttjuyyfbvvdferw.gif": "Plate Cookies",
    "hhfyikkkituidd.gif": "Poera Tale/Blue Poera Meat?",
    "ikiijuhhyk.gif": "Poop",
    "edcvfrtgbn.gif": "Popstar Scarf",
    "iopoiuyuio.gif": "Pork Stuffed Peppers",
    "bjgyprewqxzdtyh.gif": "Private Dental Insurance Map 09",
    "hfklkskeows.gif": "Psycho Destruction Ballads",
    "kslsosoos.gif": "Pumpee",
    "jjrghgmcet.gif": "Purple Flix",
    "yampodot.gif": "Purple Pucu Potion",
    "sojuenhd.gif": "Purple Striped Worm",
    "mnbvcfghjuytred.gif": "Purple Walee Balloon",
    
    "nkjigydrawxscfv.gif": "Radiator Cap",
    "okyhgygrdvvgbfd.gif": "Recycled Egg",
    "daocriupos.gif": "Recycling",
    "yuyugbgbvfredxz.gif": "Rugelach",
    "topafido.gif": "Rusty Twins Plushie",

    "popoiuyuio.gif": "Sand Cake",
    "yyhmbjipwq.gif": "Sea Salt Wig",
    "etetgdbcgd.gif": "Sea Water Book",
    "peotitehnmd.gif": "Seasonal Candycane",
    "hsgfjgcbnmc.gif": "Seasonal Vase",
    "ertgfdxcvbhuikx.gif": "Sewers Echlin Plushie",
    "ojiskdhhsu.gif": "Shiver Me Timbers Scratchcard",
    "kaakjwyggf.gif": "Silver Bean",
    "ksihfoskfi.gif": "Silver Necklace",
    "awsedrxdcfvgftg.gif": "Slime Ice Cream",
    "vbvnvmkioe.gif": "Snow Skin",
    "fhdgkhjgutyrswe.gif": "Snowball Bombs",
    "lslfotoeue.gif": "Snowflake Stamp",
    "vxcdgpujeqaxdrg.gif": "Soda Farl",
    "riiopwttyu.gif": "Soft Scarf",
    "ghktukutkk.gif": "Spaghetti Pizza",
    "dsdflhldfhd.gif": "Spanner",
    "grapmomo.gif": "Spicy Scallop Handroll",
    "maanydemadennarmankan.png": "Spooks",
    "zxcvbnmzxc.gif": "Staff of the Bee",
    "nbvbvcvbnm.gif": "Staff of Blitzen",
    "lkjlkjhghj.gif": "Starry Blueberry Pie",
    "fgjetyujdhmvj.gif": "Starry Viotto Potion",
    "sksoisoos.gif": "Strawberry Lolly",
    "fjfjdkdksl.gif": "Strobe Pancakes",
    "ddppddkkij.gif": "Summer Adorab",
    "eoronbkdo.gif": "Sword of King Baspinar V",

    "uubbnnrrgh.gif": "Teen Party Hits",
    "oofjgjgjgjgjg.gif": "The Fates Scissor Book",
    "hssksksirtshs.gif": "The Lonely Spider",
    "wewertrtyu.gif": "Trotters Sword",
    "zrtypumo.gif": "Trowel",
    "frftfgfvfc.gif": "Tundra Stamp",

    "uobhrdxqpkpkgyy.gif": "UFO Stamp",

    "ifhgmsyrr.gif": "Valentine's Day",
    "ectofrog.gif": "Vamps",
    "jfllhlhllksksksk.gif": "Vintage Diary",

    "vpwygxot.gif": "Whirlpool Treasure Map 06",
    "gjepcnusdy.gif": "White Fly Trap",
    "xcvbgfdswertpob.gif": "Winter Costume",

    "asdcvbhjkiopytr.gif": "Yellow Osafo Marshmallow",

    "bbjrwety.gif": "Zetlian Figurine",
    "ggoggptyhg.gif": "Zoink Ice Sculpture",
    "gimpwort.gif": "Zoink Ice Sculpture",
}
