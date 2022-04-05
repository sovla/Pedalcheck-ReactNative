const VersionCheck = version => {
  try {
    if (typeof version === 'string' && version.includes('.')) {
      const [v1, v2, v3] = version.split('.').map(Number);
      return v1 * 10000 + v2 * 100 + v3 * 1;
    }
  } catch (error) {
    return 10000;
  }
};

export default VersionCheck;
