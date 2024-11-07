export const COLOR = {
  // 主要颜色
  PRIMARY: "#1890ff", // 蓝绿色
  INFO: "#1890ff",
  SUCCESS: "#52c41a", // 绿色
  WARNING: "#faad14", // 橙色
  ERROR: "#f5222d", // 红色
  // text color also
  TEXT_PRIMARY: "#333", // 文字-主要
  TEXT_INFO: "#666", // 文字-信息
  TEXT_SUCCESS: "#4cae4c", // 成功文字
  TEXT_WARNING: "rgba(255, 173, 0, 0.9)", //  警告文字
  TEXT_ERROR: "#fff", // 错误文字
  // title color
};

export const SIZE = {
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
};

export const FONT = {
  medium: "MontserratMedium",
  regular: "MontserratRegular",
  bold: "MontserratBold",
};

export const style = {
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
  },
  header_text: {
    fontFamily: "MontserratMedium",
    fontSize: 20,
  },
  headerBackBtn: {
    width: 30,
    height: 30,
    justifyContent: "center",
    borderRadius: 5,
  },
};
