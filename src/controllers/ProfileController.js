const Profile = require('../model/Profile');

module.exports = {
  async index(request, response) {
    return response.render('profile', { profile: await Profile.get() });
  },

  async update(request, response) {
    const data = request.body;
    const weekPerYear = 52;
    const weekPerMonth = (weekPerYear - data["vacation-per-year"]) / 12;
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    const monthlyTotalHours = weekTotalHours * weekPerMonth;
    const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...request.body,
      "value-hour": valueHour,
    })

    return response.redirect('profile');
  }
}