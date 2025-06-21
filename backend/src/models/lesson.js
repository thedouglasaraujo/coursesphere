'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    static associate(models) {
      Lesson.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'creator_id'
      });

      Lesson.belongsTo(models.Course, {
        as: 'course',
        foreignKey: 'course_id'
      });
    }
  }

  Lesson.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      allowNull: false
    },
    publish_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isFuture(value) {
          if (new Date(value) <= new Date()) {
            throw new Error('A data de publicação deve ser futura');
          }
        }
      }
    },
    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Lesson'
  });

  return Lesson;
};
