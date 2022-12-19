type Comparison = 'EQ' | 'NEQ' | 'LT' | 'GT' | 'LTE' | 'GTE';

export interface FormComparison {
    type: Comparison;
    field: string;
    value: string | boolean;
}

export interface FormComparisonList {
    type: 'ANY' | 'ALL' | 'NONE';
    ls: FormComparison[];
}

export function compare(values: object, comparison?: FormComparison | FormComparisonList, defaultVal: boolean = false): boolean {
    if (!comparison) {
        return defaultVal;
    }
    switch(comparison.type) {
        case 'EQ':
        case 'GT':
        case 'GTE':
        case 'LT':
        case 'LTE':
        case 'NEQ':
            return compareSingle(values, comparison);
        case 'ALL':
        case 'ANY':
        case 'NONE':
            return compareList(values, comparison);
    }
}

function compareSingle(values: object, comparison: FormComparison) {
    switch(comparison.type) {
        case 'EQ':
            return values[comparison.field] === comparison.value;
        case 'GT':
            return values[comparison.field] > comparison.value;
        case 'GTE':
            return values[comparison.field] >= comparison.value;
        case 'LT':
            return values[comparison.field] < comparison.value;
        case 'LTE':
            return values[comparison.field] <= comparison.value;
        case 'NEQ':
            return values[comparison.field] !== comparison.value;
    }
}

function compareList(values: object, comparison: FormComparisonList) {
    switch(comparison.type) {
        case 'ALL':
            return comparison.ls.every(c => compareSingle(values, c));
        case 'ANY':
            return comparison.ls.some(c => compareSingle(values, c));
        case 'NONE':
            return comparison.ls.every(c => !compareSingle(values, c));
    }
}
