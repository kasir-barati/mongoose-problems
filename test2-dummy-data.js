// @ts-check
const { PointTypeModel, PointsModel, ContractorModel } = require("./test2");

const pointType1 = {
  id: "608fc6e6e92bdf23789fdd22",
  amount: -20,
};
const pointType2 = {
  id: "608fc6ee593d79062b366270",
  amount: -100,
};

const pointTypes = [
  {
    _id: pointType1.id,
    type: "bad-status-set-out",
    title: "تعیین وضعیت نادرست",
    amount: pointType1.amount,
  },
  {
    _id: pointType2.id,
    type: "another-type",
    title: "یه وضعیت دیگه",
    amount: pointType2.amount,
  },
  {
    _id: "608fdc8e060129ac85b29121",
    type: "bbb",
    title: "ببب",
    amount: 20,
  },
  {
    _id: "608fdc0223de7a852081fc71",
    type: "aaaa",
    title: "اااا",
    amount: 100,
  },
];

let projectPoints = [
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType2.id,
    amount: pointType2.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType2.id,
    amount: pointType2.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType2.id,
    amount: pointType2.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType1.id,
    amount: pointType1.amount,
  },
  {
    typeId: pointType2.id,
    amount: pointType2.amount,
  },
];

const contractorCoordinates = [
  [36.384315656972895, 59.513902220182054],
  [36.34868808312615, 59.49928274929817],
  [36.33745807492003, 59.48953544881409],
  [36.345092331039595, 59.47701083805855],
  [36.331005061778214, 59.469378537891785],
  [36.31480039117566, 59.51350802058506],
  [36.32586478896179, 59.48005350803938],
  [36.312192918843365, 59.48178439981109],
  [36.31751908268172, 59.49317999531477],
  [36.324651022543925, 59.49525628186009],
  [36.32193716395864, 59.49891294235337],
  [36.330127350333726, 59.48988508758114],
  [36.336312204148506, 59.49741082873655],
  [36.33656887720903, 59.50293375173112],
  [36.354753304894196, 59.4895698621582],
  [36.357777887816766, 59.503261778009076],
  [36.36119918213076, 59.49722297769234],
  [36.34248127090735, 59.52145151602778],
  [36.34248127090735, 59.52145151602778],
  [36.34284791738109, 59.529235195873206],
  [36.30151255260225, 59.503336812921496],
  [36.29876120312202, 59.50248713244442],
  [36.31608297552544, 59.53977435332759],
  [36.328112155251596, 59.53537422257242],
  [36.355288860226025, 59.45897058081157],
  [36.338005863927734, 59.570207150536795],
  [36.31407986925697, 59.60762932985794],
  [36.34326030062742, 59.63286355169376],
  [36.34312203051913, 59.428414856411734],
  [36.28765593230419, 59.5856566740823],
  [36.26454494713592, 59.59217980625754],
  [36.29332884062759, 59.617070705347295],
  [36.28225936780327, 59.62153390187335],
  [36.246134298180834, 59.59784463239483],
  [36.260807797427596, 59.63921502329574],
  [36.26758989867114, 59.658784419821465],
  [36.271603517894974, 59.589261563743186],
  [36.28225936780327, 59.56454232602648],
  [36.30453508060574, 59.57055047408262],
  [36.3183677247155, 59.64522317135188],
  [36.329985249057096, 59.57123711957477],
  [36.31463315266714, 59.509782348029034],
  [36.3256980309988, 59.499139342901],
  [36.33828242032654, 59.46394876142927],
  [36.31615466658099, 59.48420480344714],
  [36.27935337117116, 59.52488854885591],
  [36.34229240297501, 59.62153390187335],
  [36.3236234859653, 59.69105675795163],
];

/**
 * @returns {Promise<void>}
 */
async function insertDummy() {
  await PointTypeModel.create(pointTypes);

  let contractors = [];
  for (let index = 0; index < contractorCoordinates.length; index += 4) {
    contractors.push({
      contractorName: `contractor name ${index}`,
      location: {
        homeLocation: {
          coordinates: contractorCoordinates[index],
        },
        showRoomLocation: {
          coordinates: contractorCoordinates[index + 1],
        },
        studioLocation: {
          coordinates: contractorCoordinates[index + 2],
        },
        officeLocation: {
          coordinates: contractorCoordinates[index + 3],
        },
      },
    });
  }
  await ContractorModel.create(contractors);

  contractors = await ContractorModel.find().exec();
  for (let projectPointIndex in projectPoints) {
    projectPoints[projectPointIndex].contractor =
      contractors[Math.ceil(10 * Math.random()) - 1];
  }

  await PointsModel.create(projectPoints);
}

module.exports = { insertDummy };
