export const checkCompatibility = (processor, ram, storage, battery, thermal, phoneBuild) => {
  const issues = [], recommendations = [];
  let compatibilityScore = 100;

  // Compatibility validations
  if (!processor.supportedRAM.includes(ram.type)) {
    issues.push({ issue: "Processor does not support selected RAM" });
    recommendations.push("Choose a supported RAM type");
    compatibilityScore -= 25;
  }
  if (!processor.supportedStorage.includes(storage.type)) {
    issues.push({ issue: "Unsupported storage type" });
    recommendations.push("Choose a supported storage type");
    compatibilityScore -= 20;
  }
  if (battery.capacity < 4500) {
    issues.push({ issue: "Battery too small for performance build" });
    recommendations.push("Use 5000mAh or larger battery");
    compatibilityScore -= 15;
  }
  if (processor.performanceScore > 85 && thermal.coolingScore < 70) {
    issues.push({ issue: "Cooling system insufficient for high performance processor" });
    recommendations.push("Choose better thermal management");
    compatibilityScore -= 10;
  }
  if (phoneBuild.durabilityScore < 60 && processor.performanceScore > 80) {
    issues.push({ issue: "Low durability body for premium performance device" });
    recommendations.push("Choose stronger device build material");
    compatibilityScore -= 8;
  }

  // Dynamic score averaging metrics
  const performanceScore = Math.round((processor.performanceScore + ram.performanceScore + storage.speedScore) / 3);
  const thermalScore = Math.round((processor.thermalScore + thermal.coolingScore) / 2);
  const buildQuality = Math.round((phoneBuild.durabilityScore + phoneBuild.premiumScore) / 2);
  const batteryEfficiency = Math.min(battery.batteryScore, 100);
  const overallScore = Math.min(100, Math.round((compatibilityScore + performanceScore + thermalScore + batteryEfficiency + buildQuality) / 5));

  return {
    compatible: issues.length === 0,
    overallScore,
    performanceScore,
    thermalScore,
    batteryEfficiency,
    buildQuality,
    issues,
    recommendations
  };
};