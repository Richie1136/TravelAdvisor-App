import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {

  try {
    // request
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': 'e9f136fd86msh20374d953bfb05ep137d7ejsnaede58975cae'
      }
    });
    return data;
  } catch (error) {
    console.log(error)
  }
}
