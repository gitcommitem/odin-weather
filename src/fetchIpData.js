// Url to access the IP API is https://ipapi.co/json/

const fetchIpLocation = async () => {
  try {
    const response = await fetch('', { mode: 'cors' });
    const ipData = await response.json();
    return ipData;
  } catch (err) {
    // If IP API throws an error or can't be accessed, default to showing this location's weather
    const ipData = {
      city: 'Tokyo',
      region_code: 'Japan',
      latitude: 35.625,
      longitude: 139.625,
      timezone: 'Asia/Tokyo'
    };
    return ipData;
  }
};

export { fetchIpLocation };
