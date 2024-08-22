import axios from 'axios';

export async function getLeaderBoardInGame() {
  try {
    const url =
      'https://rave-websockets-dev-27yj2y6w4q-uc.a.run.app/leaderboard/getRanking';
    const dataRaw = await axios.get(url);
    const listId = dataRaw.data; //?.data.map((x: any) => +x.authId);
    return listId;
  } catch (error) {
    console.log(error);
  }
}

export async function delayedFunction(timeMS) {
  // console.log("Start");

  return new Promise((resolve) => {
    setTimeout(resolve, timeMS);
  });

  // console.log("End");
}
