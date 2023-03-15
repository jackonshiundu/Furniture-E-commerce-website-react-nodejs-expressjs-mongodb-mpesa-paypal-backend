const User = require('../models/usermodel');
const getCountryIso3 = require('country-iso-2-to-3');

const geographyLocation = async (req, res, next) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formatedLocation = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formatedLocation);
  } catch (error) {
    next(error);
  }
};

module.exports = { geographyLocation };
