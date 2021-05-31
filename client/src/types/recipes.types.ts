
export interface Recipe {
    id: number;
    name: string;
    description: string;
    baseHours: number;
    hoursPerUnit: number;
    setup: true;
    setUpCost: number;
    minComplexity: number;
    maxComplexity: number;
    materials: {
        items: [
            {
                material: string;
                perUnity: number;
                perSetup: number;
            }
        ]
    }
}
