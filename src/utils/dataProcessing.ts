import data from '../data/indiaagro.json';

interface CropData {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
}

export const processTableData = () => {
  const yearlyData: { [key: string]: { max: { crop: string, production: number }; min: { crop: string, production: number } } } = {};

  data.forEach((item: CropData) => {
    const year = item.Year.split(',')[1].trim();
    const production = Number(item["Crop Production (UOM:t(Tonnes))"]) || 0;

    // If the year is not in the data, initialize max and min properties
    if (!yearlyData[year]) {
      yearlyData[year] = {
        max: { crop: item["Crop Name"], production },
        min: { crop: item["Crop Name"], production },
      };
    } else {
      // Compare and update max and min crop production for each year
      if (production > yearlyData[year].max.production) {
        yearlyData[year].max = { crop: item["Crop Name"], production };
      }
      if (production < yearlyData[year].min.production) {
        yearlyData[year].min = { crop: item["Crop Name"], production };
      }
    }
  });

  return Object.entries(yearlyData).map(([year, crops]) => ({
    year,
    maxCrop: crops.max.crop,
    minCrop: crops.min.crop,
  }));
};

export const processChartData = () => {
  const cropData: { [key: string]: number[] } = {};

  data.forEach((item: CropData) => {
    const cropName = item["Crop Name"];
    const production = Number(item["Crop Production (UOM:t(Tonnes))"]) || 0;

    if (!cropData[cropName]) {
      cropData[cropName] = [];
    }
    cropData[cropName].push(production);
  });

  return Object.entries(cropData).map(([crop, productions]) => ({
    crop,
    averageProduction: productions.reduce((a, b) => a + b, 0) / productions.length,
  }));
};
