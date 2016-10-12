const INITIAL_STATE = [
  {
    id: 1,
    name: 'Elyse Greenarry',
    lastContacted: new moment("2016-07-01").hours(0).minutes(0).seconds(0).milliseconds(0),
    lastContactedLabel: new moment().hours(0).minutes(0).seconds(0).milliseconds(0).format('MMM D, YYYY'),
    contactFrequency: 1,
    contactNext: new moment("2016-07-02"),
    notes: 'Talk to her about my cool MVP.\n\nMarried on 5/14/16.\nBirthday 6/14/88',
    storiesDone: [2,3,4,5],
    message: ''
  },
  {
    id: 2,
    name: 'Chris Brenton',
    lastContacted: new moment("2016-06-30"),
    lastContactedLabel: new moment("2016-06-30").format('MMM D, YYYY'),
    contactFrequency: 14,
    contactNext: new moment("2016-07-13"),
    notes: "Python coder. Started the High Impact dodgeball league. Works a lot on improving/automating people's " +
    "workflows, e.g. deployment workflows.",
    storiesDone: [3,4],
    message: ''
  },
  {
    id: 3,
    name: 'Catrina Fuentes',
    lastContacted: new moment("2015-02-20"),
    lastContactedLabel: new moment("2015-02-20").format('MMM D, YYYY'),
    contactFrequency: 180,
    contactNext: new moment("2016-10-20"),
    notes: 'Recently (1/2015) started working at a cool company doing social media work for nonprofits.' +
    '\n\nInterned for me at Davis Dollars',
    storiesDone: [],
    message: ''
  },
  {
    id: 4,
    name: 'Nick Winter',
    lastContacted: new moment("2015-01-30"),
    lastContactedLabel: new moment("2015-01-30").format('MMM D, YYYY'),
    contactFrequency: 365,
    contactNext: new moment("2016-01-30"),
    notes: "Met through Cassie Winter, Nick's cousin. Nick started Code Combat, and now it mostly runs itself.",
    storiesDone: [],
    message: ''
  }
];

export default function contactsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
