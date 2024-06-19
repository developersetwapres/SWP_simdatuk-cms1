import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapActions, mapStateToProps } from '@/store/index'
import Layout from '@/components/core/Layout'
import EmployeesComponent from '@/components/Employment/Employee/EmployeesComponent'

export default connect(
  mapStateToProps(),
  mapActions()
)(
  class EmployeesContainer extends Component {
    static propTypes = {}

    constructor(props) {
      super(props)
      this.state = {
        willRender: false,
        datas: {
          employees: [
            {
              children: [
                {
                  position: 'Deputi Bidang Dukungan Kebijakan Pembangunan Manusia dan Pemerataan Pembangunan',
                  name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
                  image: '/simdatuk/imagePegawai.png',
                  eselon: 'Es. I.a, 25-01-2021',
                  golongan: 'Pembina Utama (IV/e), 01-04-2017',
                  nip: '1965053019991031002',
                  tmt: '14-11-1999',
                  riwayatPendidikan: [
                    'SD (SDN Karang Tengah 2, 1991)',
                    'SMP (SMP Negeri 1 Ciledug, 1994)',
                    'SMU (SMU Negeri 90 Jakarta, 1997)',
                    'D3 Administrasi Perkantoran dan Sekretaris (Universitas Indonesia, 2000)',
                    'S1 Ekonomi Manajemen (Universitas Esa Unggul, 2006)'
                  ],
                  riwayatJabatan: [
                    'Kepala Subbagian Acara, Bagian Protokol, Biro Protokol, dan Kerumahtanggaan, Deputi Bidang Administrasi',
                    'Kepala Subbagian Pelayanan Protokol, Bagian Protokol, Biro Protokol, dan Kerumahtanggaan, Deputi Bidang Administrasi, Sekretariat Wakil Presiden',
                    'Kepala Subbagian Pelayanan Protokol, Bagian Acara dan Persidangan, Biro Protokol, Deputi Bidang Administrasi, Sekretariat Wakil Presiden',
                    'Kepala Subbagian Istana Wakil Presiden, Bagian Kerumahtanggaan, Biro Protokol, Deputi Bidang Administrasi, Sekretariat Wakil Presiden',
                    'Kepala Subbagian Istana Wakil Presiden, Bagian Kerumahtanggaan, Biro Protokol dan Kerumahtanggaan, Deputi Seswapres Bidang Administrasi',
                    'Penata Acara Kepresidenan pada Subbagian Acara, Bagian Acara dan Persidangan, Biro Protokol dan Kerumahtanggaan, Deputi Seswapres Bidang Administrasi',
                    'Petugas Penyiapan Jamuan, Subbagian Jamuan, Bagian Persidangan, Biro Protokol dan Persidangan, Deputi Seswapres Bidang Administrasi'
                  ],
                  riwayatPelatihanStruktural: [
                    'Diklat PIM Tk.IV',
                    'Prajabatan'
                  ],
                  riwayatPelatihanFungsional: [],
                  riwayatPelatihanTeknis: [
                    'Webinar Setneg Serial Lecture 01 dengan tema Impacful Sociopreneursip',
                    'Webinar Innovation Talks (InnoTalks) & Music “Building innovation Playground from A to Z”',
                    'Kegiatan Seminar Virtual (Zoom Meeting) Program Pengembangan Kompentensi Biro Protokol dan Kerumahtanggaan oleh Ade Ulfah Rahayu Ningsih, S.E. dengan tema “Kendala dalam pelayanan Keprotokolan di Masa Kini”'
                  ],
                  riwayatCatatan: 'Sangat rajin dan selalu bisa diandalkan',
                  isProfile: true,
                  isCheck: false,
                  isDetail: false
                }
              ],
              position: 'Position 1',
              slot: 1,
              type: 'CARDPROFILE1'
            },
            {
              children: [
                {
                  position: 'Deputi Bidang Dukungan Kebijakan Pembangunan Manusia dan Pemerataan Pembangunan',
                  name: 'Dr. Ir. Suprayoga Hadi, M.S.P.',
                  image: '/simdatuk/imagePegawai.png',
                  eselon: 'Es. I.a, 25-01-2021',
                  golongan: 'Pembina Utama (IV/e), 01-04-2017',
                  nip: '1965053019991031002',
                  tmt: '14-11-1999',
                  riwayatPendidikan: [
                    'SD (SDN Karang Tengah 2, 1991)',
                    'SMP (SMP Negeri 1 Ciledug, 1994)',
                    'SMU (SMU Negeri 90 Jakarta, 1997)',
                    'D3 Administrasi Perkantoran dan Sekretaris (Universitas Indonesia, 2000)',
                    'S1 Ekonomi Manajemen (Universitas Esa Unggul, 2006)'
                  ],
                  riwayatJabatan: [
                    'Kepala Subbagian Acara, Bagian Protokol, Biro Protokol, dan Kerumahtanggaan, Deputi Bidang Administrasi',
                    'Kepala Subbagian Pelayanan Protokol, Bagian Protokol, Biro Protokol, dan Kerumahtanggaan, Deputi Bidang Administrasi, Sekretariat Wakil Presiden',
                    'Kepala Subbagian Pelayanan Protokol, Bagian Acara dan Persidangan, Biro Protokol, Deputi Bidang Administrasi, Sekretariat Wakil Presiden',
                    'Kepala Subbagian Istana Wakil Presiden, Bagian Kerumahtanggaan, Biro Protokol, Deputi Bidang Administrasi, Sekretariat Wakil Presiden',
                    'Kepala Subbagian Istana Wakil Presiden, Bagian Kerumahtanggaan, Biro Protokol dan Kerumahtanggaan, Deputi Seswapres Bidang Administrasi',
                    'Penata Acara Kepresidenan pada Subbagian Acara, Bagian Acara dan Persidangan, Biro Protokol dan Kerumahtanggaan, Deputi Seswapres Bidang Administrasi',
                    'Petugas Penyiapan Jamuan, Subbagian Jamuan, Bagian Persidangan, Biro Protokol dan Persidangan, Deputi Seswapres Bidang Administrasi'
                  ],
                  riwayatPelatihanStruktural: [
                    'Diklat PIM Tk.IV',
                    'Prajabatan'
                  ],
                  riwayatPelatihanFungsional: [],
                  riwayatPelatihanTeknis: [
                    'Webinar Setneg Serial Lecture 01 dengan tema Impacful Sociopreneursip',
                    'Webinar Innovation Talks (InnoTalks) & Music “Building innovation Playground from A to Z”',
                    'Kegiatan Seminar Virtual (Zoom Meeting) Program Pengembangan Kompentensi Biro Protokol dan Kerumahtanggaan oleh Ade Ulfah Rahayu Ningsih, S.E. dengan tema “Kendala dalam pelayanan Keprotokolan di Masa Kini”'
                  ],
                  riwayatCatatan: 'Sangat rajin dan selalu bisa diandalkan',
                  isProfile: true,
                  isCheck: false,
                  isDetail: false
                }
              ],
              position: 'Position 2',
              slot: 1,
              isProfile: true,
              isCheck: false,
              isDetail: false,
              type: 'CARDPROFILE1'
            }
          ]
        }
      }
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          willRender: true
        })
      }, 1000)
    }

    render() {
      return (
        <Layout willRender={this.state.willRender}>
          <EmployeesComponent {...this.state} {...this.props} />
        </Layout>
      )
    }
  }
)
