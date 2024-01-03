module.exports = async () => ({
    ...(await createJestConfig(customJestConfig)()),
  });