'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'creator_id'
      });

      Course.belongsToMany(models.User, {
        through: 'CourseInstructors',
        as: 'instructors',
        foreignKey: 'course_id',
        otherKey: 'user_id'
      });
    }
  }

  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfterStart(value) {
          if (this.start_date && value <= this.start_date) {
            throw new Error('A data final deve ser posterior à data inicial');
          }
        }
      }
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Course'
  });

  return Course;
};