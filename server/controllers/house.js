import House from "../models/House.js";

export const createHouse = async (req, res, next) => {
  const newHouse = new House(req.body);

  try {
    const savedHouse = await newHouse.save();
    res.status(200).json(savedHouse);
  } catch (err) {
    next(err);
  }
}

export const updateHouse = async (req, res, next) => {
  try {
    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHouse);
  } catch (err) {
    next(err);
  }
};

export const deleteHouse = async (req, res, next) => {
  try {
    await House.findByIdAndDelete(req.params.id);
    res.status(200).json("House has been deleted.");
  } catch (err) {
    next(err);
  }
}

export const getHouse = async (req, res, next) => {
  try {
    const house = await House.findById(req.params.id);
    res.status(200).json(house);
  } catch (err) {
    next(err);
  }
};

export const getHouses = async (req, res, next) => {

  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (err) {
    next(err);
  }
};

export const getUserHouses = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const houses = await House.find({ user: userId }).populate("user").exec();

    res.status(200).json({ houses });
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return House.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const houseCount = await House.countDocuments({ type: "Home" });
    const apartmentCount = await House.countDocuments({ type: "Apartment" });
    const villaCount = await House.countDocuments({ type: "Villa" });
    const studioCount = await House.countDocuments({ type: "Studio" });
    const officeCount = await House.countDocuments({ type: "Office" });

    res.status(200).json([
      { type: "Home", count: houseCount },
      { type: "Villa", count: villaCount },
      { type: "Apartment", count: apartmentCount },
      { type: "Office", count: officeCount },
      { type: "Studio", count: studioCount },

    ]);
  } catch (err) {
    next(err);
  }
};