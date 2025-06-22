'use strict';

module.exports = (sequelize, DataTypes) => {
    const CourseInstructors = sequelize.define('CourseInstructors', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Courses',
                key: 'id',
            },
        },
    });

    CourseInstructors.associate = (models) => {
        CourseInstructors.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });

        CourseInstructors.belongsTo(models.Course, {
            foreignKey: 'course_id',
            as: 'course',
        });
    };

    return CourseInstructors;
};
