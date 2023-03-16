async function getDays() {
  const days = await activitiesRepository.findDays();
  return days;
}

const activitiesService = {
  getDays,
};

export default activitiesService;
