const utils = {};

utils.flaggedUsers = [1663882102141, 1663900040545, 1664485938220, 1664485938220, 1682255271235];

utils.flaggedSamples = [78, 79, 103, 121, 217, 223, 296, 305, 339, 354, 381, 379, 435, 436, 434, 433, 437, 438, 439, 440, 463, 525, 566, 568, 561, 640, 643, 658, 659, 657, 661, 705, 801, 802, 803, 804, 805, 881, 980, 1144, 1211, 1361, 1362, 1363, 1364, 1365, 1366, 1367, 1423, 1587, 1579, 1611, 1610, 1609, 1801, 1855, 1937, 1938, 1966, 1969, 2019, 2020, 2022, 2018, 2031, 2040, 2078, 2258, 2281, 2356, 2465, 2603, 2650, 2652, 2653, 2655, 2723, 2792, 2794, 2850];

utils.classes = ["car", "fish", "house", "tree", "bicycle", "guitar", "pencil", "clock"];

utils.styles = {
   car: { color: "gray", text: "🚗" },
   fish: { color: "red", text: "🐠" },
   house: { color: "yellow", text: "🏠" },
   tree: { color: "green", text: "🌳" },
   bicycle: { color: "cyan", text: "🚲" },
   guitar: { color: "blue", text: "🎸" },
   pencil: { color: "magenta", text: "✏️" },
   clock: { color: "lightgray", text: "🕒" },
};
utils.styles["?"] = { color: "red", text: "❓" };

utils.formatPercent = (n) => {
   return (n * 100).toFixed(2) + "%";
};

utils.printProgress = (count, max) => {
   process.stdout.clearLine();
   process.stdout.cursorTo(0);
   const percent = utils.formatPercent(count / max);
   process.stdout.write(count + "/" + max + " (" + percent + ")");
};

utils.groupBy = (objArray, key) => {
   const groups = {};
   for (let obj of objArray) {
      const val = obj[key];
      if (groups[val] == null) {
         groups[val] = [];
      }
      groups[val].push(obj);
   }
   return groups;
};

utils.distance = (p1, p2) => {
   let sqDist = 0;
   for (let i = 0; i < p1.length; i++) {
      sqDist += (p1[i] - p2[i]) ** 2;
   }

   return Math.sqrt(sqDist);
};

utils.getNearest = (loc, points, k = 1) => {
   const obj = points.map((val, ind) => {
      return { ind, val };
   });
   const sorted = obj.sort((a, b) => {
      return utils.distance(loc, a.val) - utils.distance(loc, b.val);
   });
   const indices = sorted.map((obj) => obj.ind);
   return indices.slice(0, k);
};

utils.invLerp = (a, b, v) => {
   return (v - a) / (b - a);
};

utils.normalizePoints = (points, minMax) => {
   let min, max;
   const dimensions = points[0].length;
   if (minMax) {
      min = minMax.min;
      max = minMax.max;
   } else {
      min = [...points[0]];
      max = [...points[0]];
      for (let i = 1; i < points.length; i++) {
         for (let j = 0; j < dimensions; j++) {
            min[j] = Math.min(min[j], points[i][j]);
            max[j] = Math.max(max[j], points[i][j]);
         }
      }
   }
   for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < dimensions; j++) {
         points[i][j] = utils.invLerp(min[j], max[j], points[i][j]);
      }
   }
   return { min, max };
};

utils.toCSV = (headers, samples) => {
   let str = headers.join(",") + "\n";
   for (const sample of samples) {
      str += sample.join(",") + "\n";
   }
   return str;
};

if (typeof module !== "undefined") {
   module.exports = utils;
}
