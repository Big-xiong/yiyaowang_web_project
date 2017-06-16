/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : yiyaowang

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-06-16 16:30:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `letter` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', '安徽', 'A');
INSERT INTO `address` VALUES ('2', '北京', 'B');
INSERT INTO `address` VALUES ('3', '重庆', 'C');
INSERT INTO `address` VALUES ('4', '广东,广西,贵州,甘肃', 'G');
INSERT INTO `address` VALUES ('5', '福建', 'F');
INSERT INTO `address` VALUES ('6', '河北,黑龙江,海南,湖北,湖南,河南', 'H');
INSERT INTO `address` VALUES ('7', '江苏,吉林,江西', 'J');
INSERT INTO `address` VALUES ('8', '辽宁', 'L');
INSERT INTO `address` VALUES ('9', '内蒙古,宁夏', 'N');
INSERT INTO `address` VALUES ('10', '青海', 'Q');
INSERT INTO `address` VALUES ('11', '上海,山东,山西,四川,陕西', 'S');
INSERT INTO `address` VALUES ('12', '天津', 'T');
INSERT INTO `address` VALUES ('13', '西藏,新疆', 'X');
INSERT INTO `address` VALUES ('14', '云南', 'Y');
INSERT INTO `address` VALUES ('15', '浙江', 'Z');

-- ----------------------------
-- Table structure for clientmsg
-- ----------------------------
DROP TABLE IF EXISTS `clientmsg`;
CREATE TABLE `clientmsg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of clientmsg
-- ----------------------------
INSERT INTO `clientmsg` VALUES ('23', '6005545589ffb607bc7f9f90ce44e31d', '13112121212');
INSERT INTO `clientmsg` VALUES ('24', 'aa1a1da0fd21ce566c4ae15442f41d26', '13212121212');
INSERT INTO `clientmsg` VALUES ('25', '765f38b7c5a1513b97bc95965b2c7f1e', '13312121212');
INSERT INTO `clientmsg` VALUES ('26', '6005545589ffb607bc7f9f90ce44e31d', '13512121212');
INSERT INTO `clientmsg` VALUES ('27', '6005545589ffb607bc7f9f90ce44e31d', '13412121212');

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `comment` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `title` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('5375', 'img/g1.jpg', '322.00', '汇仁 肾宝片 126片/瓶 补肾', '1');
INSERT INTO `goodslist` VALUES (null, 'img/g2.jpg', '118.00', '施强 复方玄驹胶囊 0.42g*54粒', '2');
INSERT INTO `goodslist` VALUES ('6881', 'img/g3.jpg', '14.80', '同仁堂 六味地黄丸（浓缩丸） 120丸', '3');
INSERT INTO `goodslist` VALUES (null, 'img/g4.jpg', '9.00', '同仁堂 金匮肾气丸 0.2g*360粒', '4');
INSERT INTO `goodslist` VALUES (null, 'img/g5.jpg', '9.90', '同仁堂 金匮肾气丸 6g*10丸', '5');
INSERT INTO `goodslist` VALUES (null, 'img/g6.jpg', '36.50', '济民可信 金水宝胶囊 OTC 63粒', '6');
INSERT INTO `goodslist` VALUES ('332', 'img/g7.jpg', '15.90', '同仁堂 锁阳固精丸 9g*10丸', '7');
INSERT INTO `goodslist` VALUES (null, 'img/g8.jpg', '13.50', '同仁堂 六味地黄丸 （水蜜丸） 0.2g*360粒', '8');
INSERT INTO `goodslist` VALUES (null, 'img/g9.jpg', '24.80', '九芝堂 六味地黄丸 浓缩丸360丸', '9');
INSERT INTO `goodslist` VALUES (null, 'img/g10.jpg', '165.00', '施强 复方玄驹胶囊 0.42g*72粒/盒', '10');
INSERT INTO `goodslist` VALUES ('2352', 'img/g11.jpg', '14.80', '九芝堂 六味地黄丸 200丸/盒', '11');
INSERT INTO `goodslist` VALUES (null, 'img/g12.jpg', '49.90', '同仁堂 左归丸 54g', '12');
INSERT INTO `goodslist` VALUES ('1324', 'img/g13.jpg', '13.80', '花城 龟鹿补肾丸 4.5g*12袋', '13');
INSERT INTO `goodslist` VALUES (null, 'img/g14.jpg', '28.80', '同仁堂 知柏地黄丸 0.2g*360粒 *3件', '15');
INSERT INTO `goodslist` VALUES (null, 'img/g15.jpg', '32.00', '兰太 苁蓉益肾颗粒 2g*6袋 *10件', '16');
INSERT INTO `goodslist` VALUES (null, 'img/g16.jpg', '30.00', '仲景 六味地黄丸（浓缩丸） 360丸', '17');
INSERT INTO `goodslist` VALUES ('13249', 'img/g17.jpg', '8.50', '同仁堂 桂附地黄丸 360粒/瓶', '18');
INSERT INTO `goodslist` VALUES (null, 'img/g18.jpg', '21.00', '修正 五子衍宗丸 6g*10袋', '19');
INSERT INTO `goodslist` VALUES (null, 'img/g19.jpg', '15.50', '同仁堂 六味地黄丸 9g*10丸', '20');
INSERT INTO `goodslist` VALUES (null, 'img/g20.jpg', '39.00', '济民可信 金水宝胶囊 0.33g*63粒', '21');
INSERT INTO `goodslist` VALUES (null, 'img/g21.jpg', '72.00', '京果 海狗丸 0.2g*120粒', '22');
INSERT INTO `goodslist` VALUES (null, 'img/g22.jpg', '9.50', '陈李济 壮腰健肾丸 35g/瓶', '23');
INSERT INTO `goodslist` VALUES ('32552', 'img/g23.jpg', '75.00', '美迪生 还少胶囊 0.42克*50粒', '24');
INSERT INTO `goodslist` VALUES (null, 'img/g24.jpg', '1858.00', '同仁堂 御品(益肾强身丸 30丸+防衰益寿丸 30丸)', '25');
INSERT INTO `goodslist` VALUES (null, 'img/g25.jpg', '99.00', '汇仁 肾宝合剂 150ml/瓶', '26');
INSERT INTO `goodslist` VALUES (null, 'img/g26.jpg', '28.00', '地奥 活力苏口服液 10毫升*10支', '27');
INSERT INTO `goodslist` VALUES ('253', 'img/g27.jpg', '28.00', '999 健脑补肾丸 15丸*24袋', '28');
INSERT INTO `goodslist` VALUES (null, 'img/g28.jpg', '10.90', '佛慈 六味地黄丸（浓缩丸） 200丸', '29');
INSERT INTO `goodslist` VALUES (null, 'img/g29.jpg', '8.80', '片仔癀 六味地黄丸 360粒', '30');
INSERT INTO `goodslist` VALUES ('1235', 'img/g30.jpg', '26.00', '同一堂 天杞补肾胶囊 0.4g*60粒', '31');
INSERT INTO `goodslist` VALUES (null, 'img/g31.jpg', '45.00', '银涛 右归胶囊 0.45g*36粒', '32');
INSERT INTO `goodslist` VALUES (null, 'img/g32.jpg', '59.90', '康臣 益肾化湿颗粒 10g*9袋', '33');
INSERT INTO `goodslist` VALUES (null, 'img/g33.jpg', '15.00', '九芝堂 杞菊地黄丸 浓缩丸 200丸', '34');
INSERT INTO `goodslist` VALUES ('25', 'img/g34.jpg', '4.00', '观鹤 壮腰健肾丸 52克', '35');
INSERT INTO `goodslist` VALUES (null, 'img/g35.jpg', '24.00', '银涛 右归胶囊 0.45g*24粒', '36');
INSERT INTO `goodslist` VALUES ('12', 'img/g36.jpg', '23.00', '仲景 杞菊地黄丸（浓缩丸） 360丸', '37');
INSERT INTO `goodslist` VALUES (null, 'img/g37.jpg', '9.00', '同仁堂 石斛夜光丸  29.2g*1瓶', '38');
INSERT INTO `goodslist` VALUES (null, 'img/g38.jpg', '14.80', '同仁堂 杞菊地黄丸 120丸', '39');
INSERT INTO `goodslist` VALUES ('23', 'img/g39.jpg', '10.00', '同仁堂 石斛夜光丸  5.5g*10丸', '40');
INSERT INTO `goodslist` VALUES (null, 'img/g40.jpg', '35.00', '仲景 知柏地黄丸（浓缩丸） 0.17g*360丸', '41');
INSERT INTO `goodslist` VALUES ('34444', 'img/g41.jpg', '17.90', '仲景 六味地黄丸 浓缩丸 200丸/盒', '42');
INSERT INTO `goodslist` VALUES (null, 'img/g42.jpg', '19.50', '九芝堂 桂附地黄丸（浓缩丸） 360丸', '43');
INSERT INTO `goodslist` VALUES (null, 'img/g43.jpg', '11.80', '同仁堂 知柏地黄丸 9g*10丸', '44');
INSERT INTO `goodslist` VALUES ('1235', 'img/g44.jpg', '398.00', '龍抬頭  手参肾宝胶囊 0.3g*30粒', '45');
INSERT INTO `goodslist` VALUES (null, 'img/g45.jpg', '82.80', '中亚 至宝三鞭丸 6.25g*8盒', '46');
INSERT INTO `goodslist` VALUES (null, 'img/g46.jpg', '5.80', '天福康 杞菊地黄丸 200丸', '47');
INSERT INTO `goodslist` VALUES (null, 'img/g47.jpg', '22.00', '仁和 五子衍宗丸 6g*10袋', '48');
INSERT INTO `goodslist` VALUES ('1235', 'img/g48.jpg', '65.00', '兰太 苁蓉益肾颗粒 2g*10袋', '49');
INSERT INTO `goodslist` VALUES (null, 'img/g49.jpg', '268.00', '同仁堂 锁精丸  4g*30袋', '50');
INSERT INTO `goodslist` VALUES (null, 'img/g50.jpg', '17.80', '仲景 知柏地黄丸 0.17g*200粒', '51');
INSERT INTO `goodslist` VALUES (null, 'img/g51.jpg', '48.00', '太极 锁阳固精丸 6g*10袋', '52');
INSERT INTO `goodslist` VALUES ('132521', 'img/g52.jpg', '11.80', '白云山 六味地黄丸（浓缩丸） 200丸', '53');
INSERT INTO `goodslist` VALUES (null, 'img/g53.jpg', '6.00', '张恒春 明目地黄丸 200丸', '54');
INSERT INTO `goodslist` VALUES (null, 'img/g54.jpg', '358.00', '同仁堂 御品（益肾强身丸 180粒/瓶+防衰益寿丸 180粒/瓶）', '55');
INSERT INTO `goodslist` VALUES (null, 'img/g55.jpg', '14.80', '同仁堂 桂附地黄丸 9g*10丸', '56');
INSERT INTO `goodslist` VALUES ('12', 'img/g56.jpg', '11.00', '九芝堂 桂附地黄丸 200丸/瓶', '57');
INSERT INTO `goodslist` VALUES (null, 'img/g57.jpg', '184.00', '迪诺 蚁灵口服液 24支/盒', '58');
INSERT INTO `goodslist` VALUES ('3', 'img/g58.jpg', '74.00', '益欣 利舒康胶囊 0.5g*36粒', '59');
INSERT INTO `goodslist` VALUES (null, 'img/g59.jpg', '638.00', '同仁堂 御品(益肾强身丸10丸+防衰益寿丸10丸)', '60');
INSERT INTO `goodslist` VALUES ('12355', 'img/g60.jpg', '24.00', '鹿顶丹 全鹿丸 6g*10袋*2盒', '61');

-- ----------------------------
-- Table structure for loutimsg
-- ----------------------------
DROP TABLE IF EXISTS `loutimsg`;
CREATE TABLE `loutimsg` (
  `links` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of loutimsg
-- ----------------------------
INSERT INTO `loutimsg` VALUES ('补肾,皮炎癣症,补血补气,腹泻,鼻炎,前列腺炎,青春痘,保肝护肝,img/link1.jpg,img/link2.jpg,img/link3.jpg,img/link4.jpg,img/link5.jpg,img/link6.jpg,img/link7.jpg,img/link8.jpg', '1F 家庭常备药', '1');
INSERT INTO `loutimsg` VALUES ('性功能障碍,乙肝,风湿类风湿,高血压,抑郁症,哮喘,冠心病,糖尿病,img/link1.jpg,img/link2.jpg,img/link3.jpg,img/link4.jpg,img/link5.jpg,img/link6.jpg,img/link7.jpg,img/link8.jpg', '2F 专科用药', '2');
INSERT INTO `loutimsg` VALUES ('血压计,血糖仪,空气净化器,防霾口罩,雾化器,制氧机,理疗仪,家庭常备药,img/link1.jpg,img/link2.jpg,img/link3.jpg,img/link4.jpg,img/link5.jpg,img/link6.jpg,img/link7.jpg,img/link8.jpg', '3F 医疗器械', '3');
INSERT INTO `loutimsg` VALUES ('日抛,月抛,季抛,半年抛,年抛,护理液,润眼液,镜盒,img/link1.jpg,img/link2.jpg,img/link3.jpg,img/link4.jpg,img/link5.jpg,img/link6.jpg,img/link7.jpg,img/link8.jpg', '4F 隐形眼镜', '4');
INSERT INTO `loutimsg` VALUES ('补肾壮阳,减肥瘦身,调节三高,婴童营养,传统滋补,养生花茶,提高免疫,冬虫夏草,img/link1.jpg,img/link2.jpg,img/link3.jpg,img/link4.jpg,img/link5.jpg,img/link6.jpg,img/link7.jpg,img/link8.jpg', '5F 滋补保健', '5');
INSERT INTO `loutimsg` VALUES ('维生素B,叶酸,维生素C,复合维生素,复合矿物质,钙剂,维生素AD,维生素E,img/link1.jpg,img/link2.jpg,img/link3.jpg,img/link4.jpg,img/link5.jpg,img/link6.jpg,img/link7.jpg,img/link8.jpg', '6F 维生素钙', '6');
INSERT INTO `loutimsg` VALUES ('牙龈出血,私处护理,面膜护理,舒缓抗敏,界面卸妆,手部护理,祛痘淡疤,纸品湿巾,img/link1.jpg,img/link2.jpg,img/link3.jpg,img/link4.jpg,img/link5.jpg,img/link6.jpg,img/link7.jpg,img/link8.jpg', '7F 药妆个护', '7');
INSERT INTO `loutimsg` VALUES ('安全套,按摩棒,润滑油,飞机杯,延时液,倒模,情趣内衣,验孕,img/link1.jpg,img/link2.jpg,img/link3.jpg,img/link4.jpg,img/link5.jpg,img/link6.jpg,img/link7.jpg,img/link8.jpg', '8F 情趣用品', '8');
INSERT INTO `loutimsg` VALUES ('进口奶粉,宝宝尿裤,婴儿辅食,哺育喂养,车床玩具,清洁洗护,防辐射服,孕妈养护,img/link1.jpg,img/link2.jpg,img/link3.jpg,img/link4.jpg,img/link5.jpg,img/link6.jpg,img/link7.jpg,img/link8.jpg', '9F 母婴用品', '9');
