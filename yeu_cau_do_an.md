
# I. Chuẩn đầu ra của đồ án

Đồ án nhằm mục tiêu đạt được các chuẩn đầu ra sau:
- G1: Biết vận dụng các kỹ năng làm việc nhóm, giải quyết vấn đề, viết báo cáo và thuyết trình.
- G2: Biết sử dụng kiến thức phân tích CSDL quan hệ, CSDL NOSQL.
- G3: Phân tích, lựa chọn, vận dụng CSDL quan hệ, NoSQL phù hợp cho từng yêu cầu trông ứng dụng hệ thống thông tin thực tế hiện nay.
- G4: Thiết kế và cài đặt các chức năng phần mềm ứng sử dụng loại CSDL phù hợp.
- G5: Phân tích và sử dụng các kỹ thuật nâng cao hiệu suất khai thác dữ liệu trong hệ thống ứng dụng.

# II. Mô tả yêu cầu đồ án

## 1) Yêu cầu 1: 
Nghiên cứu và mô tả phạm vi cho các qui trình nghiệp vụ của một hệ thống thông tin thực tế.

Đối với yêu cầu này học viên thực hiện như sau:

- Học viên chọn và thực hiện khảo sát một hệ thống thông tin thực tế hiện nay để làm yêu cầu đầu vào cho phân tích đồ án, ví dụ: hệ thống gọi xe tương tự Grab, hệ thống giao đồ ăn, nền tảng học trực tuyến, mạng xã hội, v.v....
- Thông qua việc khảo sát hệ thống lựa chọn, học viên cần xác định một số nghiệp vụ chính của hệ thống thông tin, việc xác định các nghiệp vụ để làm cơ sở cho các tình huống phân tích áp dụng loại CSDL sau đó, do vậy ở bước này học viên cần nghĩ đến việc xác định các chức năng đủ lớn và phù hợp để áp dụng phân tích cho các loại lưu trữ dữ liệu.
- Xây dựng bảng mô tả yêu cầu cho hệ thống: học viên thực hiện viết báo cáo mô tả các nghiệp vụ, chức năng đã xác định trong hệ thống.

##  2. Yêu cầu 2: 
Phân tích nghiệp vụ hệ thống, xác định loại CSDL phù hợp được sử dụng cho hệ thống ứng dụng.

- Thực hiện phân tích, thiết kế chức năng đã xác định ở Yêu cầu 1
- Thực hiện phân tích & lý giái loại CSDL dữ liệu nào áp dụng phù hợp cho từng chức năng/nhóm chức năng cho hệ thống, dựa trên đặc thù của chức năng và đặc thù của loại CSDL. Lưu ý ở bước này học viên phải xác định được tính năng phù hợp cho các loại CSDL: CSDL quan hệ, Key-Value store, Document Store, Column Family Store, Graph store.
- Viết báo cáo mô tả nội dung và kết quả phân tích cho Yêu cầu 2.
## 3. Yêu cầu 3: 
Phân tích và thiết kế loại dữ liệu phù hợp cho các yêu cầu chức năng hệ thống.
- Thực hiện thiết kế dữ liệu lưu trữ cho từng chức năng/nhóm chức năng đã phân tích và xác định ở Yêu cầu 2.
- Lưu ý, với mỗi nhóm chức năng được xác định cho từng loại CSDL phù hợp, học viên cần thiết kế mô hình dữ liệu lưu trữ chi tiết phục vụ cho xử lý cho nhóm chức năng đó.
- Viết báo cáo trình bày kết quả phân tích, thiết kế dữ liệu cho Yêu cầu 3.
## 4. Yêu cầu 4: 
Thực hiện cài đặt các tính chức năng hệ thống thông qua kết nối sử dụng cho từng loại CSDL

- Thực hiện khai báo cấu trúc dữ liệu đã thiết kế cho các chức năng/nhóm chức năng bằng DBMS (Hệ QTCSDL) cụ thể.
- Đối với phần này yêu cầu bắt buộc học viên phải thực hiện khai báo cấu trúc dữ liệu cho các phần sau:
- CSDL quan hệ: có thể dùng bất kỳ loại DBMS nào (MS SQL, MySQL, ....)
- NoSQL: bắt buộc 2 loại NoSQL là: Document store (MongoDB) và Graph store (Neo4j) . Ngoài 2 loại bắt buộc, học viên có thể thực hiện thêm với các loại NoSQL khác Redis (Key-value), Cassandra (Column Family),. .... được xem là điểm đánh giá phần mở rộng của đồ án.
- Đối với việc khai báo các loại CSDL trên DBMS cần phải đảm bảo:
- Tập lệnh khai báo cấu trúc
- Tập lệnh thao tác trên dữ liệu cho các xử lý chức năng hệ thống.
- Tập lệnh phục vụ các xử lý khác (như index,...)
- Thực hiện thiết kế giao diện cho các chức năng/nhóm chức năng hệ thống.
- Thực hiện kết nối đến DBMS đề thực hiện các thao tác xử lý trên giao diện với dữ liệu đã thiết kế.
- Viết báo cáo trình bày bảng thiết kế dữ liệu cho yêu cầu 4

## 5.Yêu cầu 5 (nâng cao): 
Phân tích sử dụng kỹ thuật nâng cao hiệu suất khi khai thác dữ liệu

- Phân tích các xử lý và hiệu suất xử lý của hệ thống, từ đó phân tích các kỹ thuật nâng cao hiệu suất đã biết dành cho cho CSDL quan hệ, NoSQL, áp dụng đề khai thác dữ liệu hiệu quả.
- Thực hiện khai báo và thử nghiệm hiệu suất khai thác dữ liệu trên hệ thống với bảng kết quả phân tích.
- Trình bày kết quả thử nghiệm và đánh giá.
- Viết báo cáo cho kết quả cho Yêu cầu
# III. Các yêu cầu & quy định chi tiết cho bài nộp

- Học viên thực hiện nghiên cứu, thực hiện các yêu cầu, viết báo cáo kỹ thuật theo mẫu qui định. Lưu ý tất cả các yêu cầu được tổ chức và trình bày dưới một báo cáo hoàn chỉnh (không trình bày báo cáo cho từng phần yêu cầu).
- Phim demo cho sản phẩm, kết quả nghiên cứu.
- Phim thuyết trình cho kết quả.
- File power point trình bày kết quả đồ án (nếu yêu cầu trình bày tại lớp/chấm vấn đáp)

# IV. Cách đánh giá

- Chấm vấn đáp: học viên thuyết trình & giáo viên đánh giá.
- Nếu được yêu cầu thuyết trình tại lớp, các nhóm học viên khác cùng thảo luận và đánh giá chéo kết quả.

# V. Các quy định khác:

- Trích dẫn tài liệu nguồn khi tham khảo.
- Gian lận trong học tập sẽ bị xử lý theo qui định công bố của