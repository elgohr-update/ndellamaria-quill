const angular = require('angular');

angular.module('reg')
    .constant('EVENT_INFO', {
        NAME: 'BothoHacks 2020',
    })
    .constant('DASHBOARD', {
        UNVERIFIED: 'You should have received an email asking you verify your email. Click the link in the email and you can start your application!',
        INCOMPLETE_TITLE: 'You still need to complete your application!',
        INCOMPLETE: 'If you do not complete your application before [APP_DEADLINE], you will not be considered for admission to BothoHacks 2020!',
        SUBMITTED_TITLE: 'Your application has been submitted!',
        SUBMITTED: 'Feel free to edit it at any time. However, once registration is closed, you will not be able to edit it any further.',
        CLOSED_AND_INCOMPLETE_TITLE: 'Unfortunately, registration for BothoHacks 2020 has closed.',
        CLOSED_AND_INCOMPLETE: 'Because you have not completed your profile in time, you will not be eligible to participate in BothoHacks 2020. \nFeel free to email us at info@bothohacks.org with questions or concerns.',
        ADMITTED_AND_CAN_CONFIRM_TITLE: 'You must confirm your participation by [CONFIRM_DEADLINE].',
        ADMITTED_AND_CANNOT_CONFIRM_TITLE: 'Your confirmation deadline of [CONFIRM_DEADLINE] has passed.',
        ADMITTED_AND_CANNOT_CONFIRM: 'Although you were accepted, you did not complete your confirmation in time. \nIf you would still like to participate in BothoHacks 2020, you MUST email us at info@bothohacks.org to still be considered for the event. Thanks!',
        CONFIRMED_NOT_PAST_TITLE: 'You can edit your confirmation information until [CONFIRM_DEADLINE].',
        DECLINED: 'We\'re sorry to hear that you won\'t be able to make it to BothoHacks 2020! :(\nMaybe next year! We hope you see you again soon.',
    })
    .constant('TEAM',{
        NO_TEAM_REG_CLOSED: 'Unfortunately, it\'s too late to enter the hackathon with a team.\nHowever, you can still form teams on your own before or during the event!',
    });
