import {inject} from 'aurelia-framework';
import {User} from '../services/user';
import * as HighCharts from "highcharts";
import Exporting from "node_modules/highcharts/modules/exporting.js"
import {Constants} from '../services/constants';

@inject(User, Constants)
export class Chart {
    constructor(user, constants) {
        this.user = user;
        this.constants = constants;
    }

    //CHART OF EXPENSES FOR FIVE YEARS
    createFiveYearChart(containerID, results) {
        Highcharts.chart(containerID, {

            title: {
                text: 'Your Expenses Over the Next 5 Years'
            },

            yAxis: {
                title: {
                    text: 'Expenses'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    pointStart: 2017
                }
            },

            series: [{
                name: 'Home',
                data: results.homeFiveYears
            }, {
                name: 'Car',
                data: results.carFiveYears
            }, {
                name: 'Health',
                data: results.healthFiveYears
            }, {
                name: 'Discretionary',
                data: results.discretionaryFiveYears
            }]

        });
    }


    //USER CHART RESULTS
    createSimpleChart(containerID, results) {
        Highcharts.chart(containerID, {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: 'Your Budget Plan'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Delivered amount',
                data: results.simpleChartResults
            }]
        });
    }

    createAdvancedChart(containerID, results) {
        var categories = ['Home', 'Car', 'Health', 'Discretionary'],
            data = [{
                y: results.homePercentage,
                drilldown: {
                    name: 'Home Expenses',
                    categories: this.constants.homeCategories,
                    data: results.homePercentageArray,
                }
            }, {
                y: results.carPercentage,
                drilldown: {
                    name: 'Car Expenses',
                    categories: this.constants.carCategories,
                    data: results.carPercentageArray,
                }
            }, {
                y: results.healthPercentage,
                drilldown: {
                    name: 'Health Expenses',
                    categories: this.constants.healthCategories,
                    data: results.healthPercentageArray,
                }
            }, {
                y: results.discretionaryPercentage,
                drilldown: {
                    name: 'Discretionary Expenses',
                    categories: this.constants.discretionaryCategories,
                    data: results.discretionaryPercentageArray,
                }
            }],
            browserData = [],
            versionsData = [],
            i,
            j,
            dataLen = data.length,
            drillDataLen,
            brightness;


        // Build the data arrays
        for (i = 0; i < dataLen; i += 1) {

            // add browser data
            browserData.push({
                name: categories[i],
                y: data[i].y,
            });

            // add version data
            drillDataLen = data[i].drilldown.data.length;
            for (j = 0; j < drillDataLen; j += 1) {
                brightness = 0.2 - (j / drillDataLen) / 5;
                versionsData.push({
                    name: data[i].drilldown.categories[j],
                    y: data[i].drilldown.data[j],
                });
            }
        }

        // Create the chart
        Highcharts.chart(containerID, {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Your Advanced Budet Plan'
            },
            yAxis: {
                title: {
                    text: 'Total percent of budget'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
                valueSuffix: '%',
                valueDecimals: 2
            },
            series: [{
                name: 'Percentage of Total Expense',
                data: browserData,
                size: '50%',
                dataLabels: {
                    formatter: function () {
                        return this.y > 5 ? this.point.name : null;
                    },
                    color: '#ffffff',
                    distance: -30
                }
            }, {
                name: 'Amount',
                data: versionsData,
                size: '80%',
                innerSize: '60%',
                dataLabels: {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                            this.y + '%' : null;
                    }
                },
                id: 'versions'
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 400
                    },
                    chartOptions: {
                        series: [{
                            id: 'versions',
                            dataLabels: {
                                enabled: false
                            }
                        }]
                    }
                }]
            }
        });
    }


    //RECOMMENDED CHARTS
    createRecommendedChart(containerID, results) {
        Highcharts.chart(containerID, {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                },
                shadow: true
            },
            title: {
                text: 'Recommended Budget Plan'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>'
                    }
                }
            },
            series: [{
                name: 'Expense amount',
                data: results.recommendedResults
            }]
        });
    }

    createAdvancedRecommendedChart(containerID, results) {
        var categories = ['Home', 'Car', 'Health', 'Discretionary'],
            data = [{
                y: results.homePercentage,
                drilldown: {
                    name: 'Home Expenses',
                    categories: this.constants.homeCategories,
                    data: results.homePercentageArray,
                }
            }, {
                y: results.carPercentage,
                drilldown: {
                    name: 'Car Expenses',
                    categories: this.constants.carCategories,
                    data: results.carPercentageArray,
                }
            }, {
                y: results.healthPercentage,
                drilldown: {
                    name: 'Health Expenses',
                    categories: this.constants.healthCategories,
                    data: results.healthPercentageArray,
                }
            }, {
                y: results.discretionaryPercentage,
                drilldown: {
                    name: 'Discretionary Expenses',
                    categories: this.constants.discretionaryCategories,
                    data: results.discretionaryPercentageArray,
                }
            }],
            browserData = [],
            versionsData = [],
            i,
            j,
            dataLen = data.length,
            drillDataLen,
            brightness;


        // Build the data arrays
        for (i = 0; i < dataLen; i += 1) {

            // add browser data
            browserData.push({
                name: categories[i],
                y: data[i].y,
            });

            // add version data
            drillDataLen = data[i].drilldown.data.length;
            for (j = 0; j < drillDataLen; j += 1) {
                brightness = 0.2 - (j / drillDataLen) / 5;
                versionsData.push({
                    name: data[i].drilldown.categories[j],
                    y: data[i].drilldown.data[j],
                });
            }
        }

        // Create the chart
        Highcharts.chart(containerID, {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Your Advanced Budet Plan'
            },
            yAxis: {
                title: {
                    text: 'Total percent of budget'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
                valueSuffix: '%',
                valueDecimals: 2
            },
            series: [{
                name: 'Percentage of Total Expense',
                data: browserData,
                size: '50%',
                dataLabels: {
                    formatter: function () {
                        return this.y > 5 ? this.point.name : null;
                    },
                    color: '#ffffff',
                    distance: -30
                }
            }, {
                name: 'Amount',
                data: versionsData,
                size: '80%',
                innerSize: '60%',
                dataLabels: {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
                            this.y + '%' : null;
                    }
                },
                id: 'versions'
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 400
                    },
                    chartOptions: {
                        series: [{
                            id: 'versions',
                            dataLabels: {
                                enabled: false
                            }
                        }]
                    }
                }]
            }
        });
    }
}