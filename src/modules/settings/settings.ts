export const info = {
  buildDate: new Date().toISOString(),
  buildVersion: "dev",
};

console.log("test");

try {
  const infoPath = "/training-js/info.json";
  const json = await import(/* @vite-ignore */ infoPath, {
    assert: { type: "json" },
  });
  info.buildDate = json.buildDate;
  info.buildVersion = json.buildVersion;
} catch (e) {
  console.warn("Build info file not found, using default values", e);
}

// Использование
console.log("Build version:", info.buildVersion);
console.log("Build date:", new Date(info.buildDate).toLocaleString());
